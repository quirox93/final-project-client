"use client";

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/utils/config";
import Image from "next/image";
import { useState } from "react";

export default function Cloud() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState("");

  function handleOnChange(event) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData("");
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === "file");

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setUploadData({ public_id: data.public_id, secure_url: data.secure_url });
  }

  return (
    <div>
      <form method="post" onSubmit={handleOnSubmit}>
        <p>
          <input onChange={handleOnChange} type="file" name="file" />
        </p>
        {imageSrc && <Image width={150} height={150} alt={imageSrc} src={imageSrc} />}

        <p>
          <button>Add Product</button>
        </p>
      </form>
      {uploadData && (
        <code>
          <pre>{JSON.stringify(uploadData, null, 2)}</pre>
        </code>
      )}
    </div>
  );
}
