"use client";

import { useEffect, useState } from "react";
import Avatar from "@/app/assets/icons/Avatar";
import Image from "next/image";

export default function ImageUploaderPreview({ errorMsg, onChange }) {
  const [preview, setPreview] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setSelectedImage(file);
    const { fun, key } = onChange;
    fun((prev) => ({ ...prev, [key]: file }));
  }

  useEffect(() => {
    if (!selectedImage) return;
    const objectURL = URL.createObjectURL(selectedImage);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [selectedImage]);

  return (
    <div>
      <div className="avatar relative">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {!preview ? (
            <Avatar />
          ) : (
            <Image src={preview} width={24} height={24} alt="" />
          )}
        </div>

        <label
          htmlFor="profile"
          className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
        />

        <input
          type="file"
          accept="image/*"
          className="absolute top-0 left-0 -z-10 opacity-0"
          id="profile"
          onChange={handleChange}
        />
      </div>

      <label className="label">
        <span className={`label-text-alt text-error ${!errorMsg && "hidden"}`}>
          {errorMsg}
        </span>
      </label>
    </div>
  );
}
