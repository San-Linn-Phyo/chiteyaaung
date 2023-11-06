"use client";

import Avatar from "@/app/assets/icons/Avatar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageField({ errorMessage, setFieldValue, disabled }) {
  const [preview, setPreview] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function handleChange(e) {
    const file = e.target.files[0];
    setFieldValue("image", file);
    if (!file || !file.type.startsWith("image/")) {
      setPreview("");
      return;
    }

    setSelectedImage(file);
  }

  useEffect(() => {
    if (!selectedImage) return;
    const objectURL = URL.createObjectURL(selectedImage);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [selectedImage]);

  return (
    <div className="grid justify-center">
      <div className="avatar relative">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
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
          disabled={disabled}
        />
      </div>

      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    </div>
  );
}
