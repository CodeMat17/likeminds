import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  checkAdminPassword,
  deleteGalleryPhoto,
  isCloudinaryConfigured,
  listGalleryAlbums,
  signedUploadParams,
} from "@/lib/cloudinary";

// Admin actions for the photo gallery. Every action requires GALLERY_ADMIN_PASSWORD.
// Files are uploaded straight from the browser to Cloudinary using a signature issued
// here, so large photos never pass through this server.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!checkAdminPassword(body.password)) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "Cloudinary is not configured on the server" },
        { status: 500 },
      );
    }

    switch (body.action) {
      case "verify":
        return NextResponse.json({ success: true });

      case "list":
        return NextResponse.json({ albums: await listGalleryAlbums({ fresh: true }) });

      case "sign": {
        const album = String(body.album ?? "").trim().slice(0, 120);
        const year = String(body.year ?? "").trim();
        const caption = String(body.caption ?? "").trim().slice(0, 200);
        if (!album) return NextResponse.json({ error: "Album title is required" }, { status: 400 });
        if (!/^\d{4}$/.test(year)) {
          return NextResponse.json({ error: "Year must be four digits" }, { status: 400 });
        }
        return NextResponse.json(signedUploadParams({ album, year, caption }));
      }

      case "delete": {
        const publicId = String(body.publicId ?? "");
        // Only allow deleting assets that belong to the gallery.
        const albums = await listGalleryAlbums({ fresh: true });
        if (!albums.some((a) => a.images.some((img) => img.publicId === publicId))) {
          return NextResponse.json({ error: "Photo not found in gallery" }, { status: 404 });
        }
        await deleteGalleryPhoto(publicId);
        revalidatePath("/gallery");
        return NextResponse.json({ success: true });
      }

      case "revalidate":
        revalidatePath("/gallery");
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Gallery API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
