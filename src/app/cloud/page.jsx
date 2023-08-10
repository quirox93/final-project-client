import CloudForm from "@/components/CloudUploader";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/utils/config";

export default function Cloud() {
  console.log(CLOUDINARY_CLOUD_NAME);
  return (
    <CloudForm
      CLOUDINARY_CLOUD_NAME={CLOUDINARY_CLOUD_NAME}
      CLOUDINARY_UPLOAD_PRESET={CLOUDINARY_UPLOAD_PRESET}
    />
  );
}
