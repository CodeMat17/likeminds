// Server-only: uses the Cloudinary API secret. Never import from client components.
import { createHash, timingSafeEqual } from "crypto";

// Gallery photos live in Cloudinary. Every upload is tagged GALLERY_TAG and carries
// its album, year and caption as context metadata, so no separate database is needed.
export const GALLERY_TAG = "likeminds-gallery";
export const GALLERY_FOLDER = "likeminds/gallery";

export type GalleryPhoto = {
  publicId: string;
  src: string;
  width: number;
  height: number;
  caption?: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  year: string;
  images: GalleryPhoto[];
};

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
  context?: { custom?: Record<string, string> };
};

const env = () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
});

export const isCloudinaryConfigured = () => {
  const { cloudName, apiKey, apiSecret } = env();
  return Boolean(cloudName && apiKey && apiSecret);
};

export function checkAdminPassword(password: unknown) {
  const expected = process.env.GALLERY_ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// https://cloudinary.com/documentation/authentication_signatures
export function signParams(params: Record<string, string | number>) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + env().apiSecret).digest("hex");
}

// Context values must escape "=" and "|", which Cloudinary uses as separators.
const escapeContext = (v: string) => v.replace(/([=|])/g, "\\$1");

export function signedUploadParams(meta: { album: string; year: string; caption?: string }) {
  const { cloudName, apiKey } = env();
  const context = [
    `album=${escapeContext(meta.album)}`,
    `year=${escapeContext(meta.year)}`,
    meta.caption ? `caption=${escapeContext(meta.caption)}` : null,
  ]
    .filter(Boolean)
    .join("|");

  const params = {
    context,
    folder: GALLERY_FOLDER,
    tags: GALLERY_TAG,
    timestamp: Math.round(Date.now() / 1000),
  };

  return {
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    fields: { ...params, api_key: apiKey, signature: signParams(params) },
  };
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function listGalleryAlbums(
  { fresh = false }: { fresh?: boolean } = {},
): Promise<GalleryAlbum[]> {
  if (!isCloudinaryConfigured()) return [];
  const { cloudName, apiKey, apiSecret } = env();
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const resources: CloudinaryResource[] = [];
  let cursor: string | undefined;
  do {
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${GALLERY_TAG}`,
    );
    url.searchParams.set("context", "true");
    url.searchParams.set("max_results", "500");
    if (cursor) url.searchParams.set("next_cursor", cursor);

    const res = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
      ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 300 } }),
    });
    if (!res.ok) {
      console.error("Cloudinary list error:", res.status, await res.text());
      break;
    }
    const data: { resources: CloudinaryResource[]; next_cursor?: string } = await res.json();
    resources.push(...data.resources);
    cursor = data.next_cursor;
  } while (cursor);

  // Oldest first within an album; albums ordered by their most recent upload.
  resources.sort((a, b) => a.created_at.localeCompare(b.created_at));
  const albums = new Map<string, GalleryAlbum>();
  const latest = new Map<string, string>();
  for (const r of resources) {
    const ctx = r.context?.custom ?? {};
    const title = ctx.album?.trim() || "Untitled";
    const year = ctx.year?.trim() || r.created_at.slice(0, 4);
    const id = `${slugify(title)}-${year}`;
    const album = albums.get(id) ?? { id, title, year, images: [] };
    album.images.push({
      publicId: r.public_id,
      src: r.secure_url,
      width: r.width,
      height: r.height,
      caption: ctx.caption || undefined,
    });
    latest.set(id, r.created_at);
    albums.set(id, album);
  }

  return [...albums.values()].sort((a, b) => latest.get(b.id)!.localeCompare(latest.get(a.id)!));
}

export async function deleteGalleryPhoto(publicId: string) {
  const { cloudName, apiKey } = env();
  const params = { invalidate: "true", public_id: publicId, timestamp: Math.round(Date.now() / 1000) };
  const body = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    api_key: apiKey,
    signature: signParams(params),
  });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: "POST",
    body,
  });
  const data: { result?: string; error?: { message: string } } = await res.json();
  if (!res.ok || data.result !== "ok") {
    throw new Error(data.error?.message ?? `Delete failed (${data.result ?? res.status})`);
  }
}
