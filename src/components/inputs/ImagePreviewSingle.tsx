"use client";

import { useEffect, useState } from "react";
import { useField } from "formik";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import { MdInsertPhoto } from "react-icons/md";

interface ImagePreviewSingleProps {
  name: string;
  label?: string;
}

export const ImagePreviewSingle: React.FC<ImagePreviewSingleProps> = ({
  name,
  label,
}) => {
  const [field, meta, helpers] = useField<File | null>(name);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!field.value) {
      setPreviewUrl(null);
    }
  }, [field.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      helpers.setValue(file);
      helpers.setTouched(true);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    helpers.setValue(null);
  };

  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <label
        htmlFor={name}
        className={clsx(
          "flex max-h-72 min-h-60 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300",
        )}
      >
        {previewUrl ? (
          <div className="relative max-h-72 w-full">
            <Image
              src={previewUrl}
              alt="Preview"
              height={500}
              width={500}
              className="h-full w-full"
            />
            <button
              type="button"
              className="absolute top-4 right-5 cursor-pointer rounded-full bg-red-500 p-1 text-xs text-white"
              onClick={(e) => {
                e.preventDefault();
                handleRemove();
              }}
            >
              <IoClose size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <MdInsertPhoto />
            <span className="text-sm font-medium">Unggah gambar</span>
          </div>
        )}
        <input
          type="file"
          name={name}
          id={name}
          onChange={handleChange}
          className="hidden"
        />
      </label>
      {meta.touched && meta.error && (
        <p className="text-[11px] text-red-500">{meta.error}</p>
      )}
    </div>
  );
};
