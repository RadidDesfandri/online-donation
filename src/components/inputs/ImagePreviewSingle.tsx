"use client";

import { useEffect, useState } from "react";
import { useField } from "formik";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import { MdInsertPhoto } from "react-icons/md";
import { useToast } from "@/context/ToastContext";

interface ImagePreviewSingleProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

export const ImagePreviewSingle: React.FC<ImagePreviewSingleProps> = ({
  name,
  label,
  disabled,
}) => {
  const [field, meta, helpers] = useField<File | null>(name);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { addToast } = useToast();

  const maxFileSize = 1 * 1024 * 1024;

  useEffect(() => {
    if (!field.value) {
      setPreviewUrl(null);
    }
  }, [field.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      if (file.size > maxFileSize) {
        addToast("Maksimal 1 mb", "error");
      } else {
        if (previewUrl) URL.revokeObjectURL(previewUrl);

        const newPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(newPreviewUrl);
        helpers.setValue(file);
        helpers.setTouched(true);
      }
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
          "flex max-h-72 min-h-44 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 md:min-h-60",
          disabled ? "cursor-default opacity-55" : "cursor-pointer",
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
          disabled={disabled}
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
