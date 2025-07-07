import { getMedia } from "@/registry/default/dynamic-components/media-uploader/actions/media-actions";
import { MediaGallery } from "@/registry/default/dynamic-components/media-uploader/components/media-gallery";

export default async function MediaPage() {
  const media = await getMedia();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Media Gallery</h1>
      <MediaGallery media={media} />
    </div>
  );
}
