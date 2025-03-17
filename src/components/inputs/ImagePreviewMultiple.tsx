/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useField } from "formik";
import Image from "next/image";

interface ImagePreviewMultipleProps {
  name: string;
  previewPosition?: "top" | "bottom";
}

export const ImagePreviewMultiple: React.FC<ImagePreviewMultipleProps> = ({
  name,
  previewPosition = "bottom",
}) => {
  const [field, meta, helpers] = useField<FileList | null>(name);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      helpers.setValue(files);
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {previewPosition === "top" && (
        <div className="flex flex-wrap gap-2">
          {previewUrls.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt="Preview"
              width={150}
              height={150}
              className="h-24 w-24 rounded-lg object-cover"
            />
          ))}
        </div>
      )}
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="rounded-lg border p-2"
      />
      {previewPosition === "bottom" && (
        <div className="flex flex-wrap gap-2">
          {previewUrls.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt="Preview"
              width={150}
              height={150}
              className="h-24 w-24 rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};
