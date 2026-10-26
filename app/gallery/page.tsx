import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { listGalleryAlbums } from "@/lib/cloudinary";

// Albums come from Cloudinary; uploads and deletes revalidate this page immediately.
export const revalidate = 300;

export default async function GalleryPage() {
  const albums = await listGalleryAlbums();

  return (
    <>
      <PageHero
        eyebrow='Photo Gallery'
        title='Memories of'
        accent='togetherness.'
        watermark='Memories'
        description={
          <>
            Outings, projects, and milestones captured in pictures. Our story, told through
            the faces of <em className='font-display text-gold'>Ofu Obi Umunwanne</em>.
          </>
        }
      />
      <GalleryGrid albums={albums} />
    </>
  );
}
