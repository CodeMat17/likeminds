"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  LockIcon,
  UploadCloudIcon,
  XIcon,
  Trash2Icon,
  ArrowUpRightIcon,
  CheckIcon,
  LogOutIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/ui/PageHero";
import { UliBand } from "@/components/ui/Ornaments";
import type { GalleryAlbum } from "@/lib/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024; // Cloudinary free-plan image limit
const PASSWORD_KEY = "lm-gallery-password";

type Pending = { id: string; file: File; preview: string; caption: string; status: "ready" | "uploading" | "done" | "error" };

async function api<T = { success: true }>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

const card =
  "overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_40px_80px_-50px_oklch(0.22_0.05_155/45%)]";
const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-bold text-primary-foreground transition-colors duration-300 hover:bg-clay disabled:opacity-60";

export default function GalleryUploadPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);

  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [pending, setPending] = useState<Pending[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const refreshAlbums = async (pw = password) => {
    try {
      const { albums } = await api<{ albums: GalleryAlbum[] }>({ action: "list", password: pw });
      setAlbums(albums);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load albums");
    }
  };

  const login = async (pw: string, silent = false) => {
    setChecking(true);
    try {
      await api({ action: "verify", password: pw });
      setAuthed(true);
      try {
        sessionStorage.setItem(PASSWORD_KEY, pw);
      } catch {}
      refreshAlbums(pw);
    } catch (err) {
      if (!silent) toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setChecking(false);
    }
  };

  // Stay signed in for the rest of the browser session.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(PASSWORD_KEY);
    } catch {}
    if (saved) {
      setPassword(saved);
      login(saved, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    try {
      sessionStorage.removeItem(PASSWORD_KEY);
    } catch {}
    setAuthed(false);
    setPassword("");
  };

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Pending[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_BYTES) {
        toast.error(`${file.name} is larger than 10 MB`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        file,
        preview: URL.createObjectURL(file),
        caption: "",
        status: "ready",
      });
    }
    setPending((p) => [...p, ...next.filter((n) => !p.some((x) => x.id === n.id))]);
  };

  const removePending = (id: string) =>
    setPending((p) => {
      const item = p.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return p.filter((x) => x.id !== id);
    });

  const setStatus = (id: string, status: Pending["status"]) =>
    setPending((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    const queue = pending.filter((p) => p.status !== "done");
    if (!album.trim()) return toast.error("Enter an album title");
    if (!queue.length) return toast.error("Choose at least one photo");

    setUploading(true);
    let ok = 0;
    for (const item of queue) {
      setStatus(item.id, "uploading");
      try {
        const { uploadUrl, fields } = await api<{ uploadUrl: string; fields: Record<string, string | number> }>({
          action: "sign",
          password,
          album,
          year,
          caption: item.caption,
        });
        const form = new FormData();
        form.append("file", item.file);
        for (const [k, v] of Object.entries(fields)) form.append(k, String(v));
        const res = await fetch(uploadUrl, { method: "POST", body: form });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error?.message ?? "Upload failed");
        }
        setStatus(item.id, "done");
        ok++;
      } catch (err) {
        setStatus(item.id, "error");
        toast.error(`${item.file.name}: ${err instanceof Error ? err.message : "Upload failed"}`);
      }
    }
    setUploading(false);

    if (ok) {
      await api({ action: "revalidate", password }).catch(() => {});
      toast.success(`${ok} photo${ok !== 1 ? "s" : ""} added to “${album.trim()}”`);
      setPending((p) => {
        p.filter((x) => x.status === "done").forEach((x) => URL.revokeObjectURL(x.preview));
        return p.filter((x) => x.status !== "done");
      });
      refreshAlbums();
    }
  };

  const deletePhoto = async (publicId: string) => {
    if (!confirm("Delete this photo from the gallery? This cannot be undone.")) return;
    setDeleting(publicId);
    try {
      await api({ action: "delete", password, publicId });
      setAlbums((list) =>
        list
          .map((a) => ({ ...a, images: a.images.filter((img) => img.publicId !== publicId) }))
          .filter((a) => a.images.length),
      );
      toast.success("Photo deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <PageHero
        compact
        eyebrow='Gallery Admin'
        title='Upload event'
        accent='photos.'
        watermark='Upload'
        description='Add pictures from our outings, meetings and projects to the public gallery.'
      />

      <section className='bg-background py-16 sm:py-24'>
        <div className='mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8'>
          {!authed ? (
            <div className={`${card} mx-auto max-w-md`}>
              <UliBand className='text-clay/50' height={8} />
              <form
                className='space-y-6 p-7 sm:p-10'
                onSubmit={(e) => {
                  e.preventDefault();
                  login(password);
                }}>
                <span className='grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary'>
                  <LockIcon className='size-5' />
                </span>
                <div>
                  <h2 className='font-display text-3xl font-medium text-foreground'>Admins only</h2>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    Enter the gallery password shared by the executive council.
                  </p>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type='submit' disabled={checking} className={`${primaryBtn} w-full`}>
                  {checking ? "Checking…" : "Continue"}
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <Link
                  href='/gallery'
                  className='inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-clay'>
                  View public gallery <ArrowUpRightIcon className='size-4' />
                </Link>
                <button
                  onClick={logout}
                  className='inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground'>
                  <LogOutIcon className='size-4' /> Sign out
                </button>
              </div>

              {/* Upload form */}
              <div className={card}>
                <UliBand className='text-clay/50' height={8} />
                <form onSubmit={upload} className='space-y-6 p-7 sm:p-10'>
                  <div>
                    <h2 className='font-display text-3xl font-medium text-foreground'>New photos</h2>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      Photos with the same album title and year are grouped together. Use an existing
                      title to add to an album.
                    </p>
                  </div>

                  <div className='grid gap-5 sm:grid-cols-[1fr_9rem]'>
                    <div className='space-y-2'>
                      <Label htmlFor='album'>Album / event title *</Label>
                      <Input
                        id='album'
                        list='album-titles'
                        placeholder='e.g. Christmas Solidarity Outing'
                        value={album}
                        onChange={(e) => {
                          setAlbum(e.target.value);
                          const match = albums.find((a) => a.title === e.target.value);
                          if (match) setYear(match.year);
                        }}
                        maxLength={120}
                        required
                      />
                      <datalist id='album-titles'>
                        {[...new Set(albums.map((a) => a.title))].map((t) => (
                          <option key={t} value={t} />
                        ))}
                      </datalist>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='year'>Year *</Label>
                      <Input
                        id='year'
                        inputMode='numeric'
                        pattern='\d{4}'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      addFiles(e.dataTransfer.files);
                    }}
                    className='flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-muted/40 px-6 py-12 text-center transition-colors hover:border-primary/50 hover:bg-primary/5'>
                    <UploadCloudIcon className='size-9 text-primary' />
                    <span className='font-semibold text-foreground'>Click to choose photos or drop them here</span>
                    <span className='text-xs text-muted-foreground'>JPG, PNG, WebP or HEIC · up to 10 MB each</span>
                    <input
                      type='file'
                      accept='image/*'
                      multiple
                      className='sr-only'
                      onChange={(e) => {
                        addFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>

                  {pending.length > 0 && (
                    <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                      {pending.map((p) => (
                        <li key={p.id} className='overflow-hidden rounded-2xl border border-border bg-background'>
                          <div className='relative aspect-4/3 bg-muted'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.preview} alt='' className='size-full object-cover' />
                            {p.status === "ready" || p.status === "error" ? (
                              <button
                                type='button'
                                onClick={() => removePending(p.id)}
                                disabled={uploading}
                                aria-label='Remove'
                                className='absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80'>
                                <XIcon className='size-4' />
                              </button>
                            ) : null}
                            {p.status !== "ready" && (
                              <span
                                className={`absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                                  p.status === "error" ? "bg-destructive" : p.status === "done" ? "bg-primary" : "bg-black/60"
                                }`}>
                                {p.status === "uploading" && (
                                  <span className='size-3 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                                )}
                                {p.status === "done" && <CheckIcon className='size-3' />}
                                {p.status === "uploading" ? "Uploading" : p.status === "done" ? "Uploaded" : "Failed"}
                              </span>
                            )}
                          </div>
                          <Input
                            aria-label={`Caption for ${p.file.name}`}
                            placeholder='Caption (optional)'
                            value={p.caption}
                            maxLength={200}
                            disabled={uploading}
                            onChange={(e) =>
                              setPending((list) =>
                                list.map((x) => (x.id === p.id ? { ...x, caption: e.target.value } : x)),
                              )
                            }
                            className='rounded-none border-0 border-t shadow-none'
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  <button type='submit' disabled={uploading || !pending.length} className={primaryBtn}>
                    {uploading ? (
                      <>
                        <span className='size-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                        Uploading…
                      </>
                    ) : (
                      <>
                        <UploadCloudIcon className='size-4' />
                        Upload {pending.filter((p) => p.status !== "done").length || ""} photo
                        {pending.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Existing albums */}
              <div className='space-y-6'>
                <h2 className='font-display text-3xl font-medium text-foreground'>Albums in the gallery</h2>
                {albums.length === 0 && (
                  <p className='text-muted-foreground'>No photos uploaded yet.</p>
                )}
                {albums.map((a) => (
                  <div key={a.id} className='rounded-3xl border border-border bg-card p-5 sm:p-6'>
                    <div className='flex items-baseline justify-between gap-3'>
                      <p className='font-display text-xl text-foreground'>{a.title}</p>
                      <p className='eyebrow shrink-0 text-clay'>
                        {a.year} · {a.images.length} photo{a.images.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <ul className='mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6'>
                      {a.images.map((img) => (
                        <li key={img.publicId} className='group relative aspect-square overflow-hidden rounded-xl bg-muted'>
                          <Image
                            src={img.src}
                            alt={img.caption ?? a.title}
                            fill
                            sizes='160px'
                            className='object-cover'
                          />
                          <button
                            onClick={() => deletePhoto(img.publicId)}
                            disabled={deleting === img.publicId}
                            aria-label='Delete photo'
                            className='absolute top-1.5 right-1.5 grid size-8 place-items-center rounded-full bg-black/60 text-white opacity-100 transition-opacity hover:bg-destructive sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100'>
                            {deleting === img.publicId ? (
                              <span className='size-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                            ) : (
                              <Trash2Icon className='size-4' />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
