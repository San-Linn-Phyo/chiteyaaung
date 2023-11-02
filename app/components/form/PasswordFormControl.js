"use client";

import { Eye } from "@/app/assets/icons/Eye";
import { EyeSlash } from "@/app/assets/icons/EyeSlash";
import { useState } from "react";

export default function PasswordFormControl({
  fieldFor,
  value,
  onChange,
  errorMsg,
  autoFocus,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { fun, key } = onChange;
    fun((preValue) => {
      const newValue = { ...preValue };
      newValue[key] = e.target.value;
      return newValue;
    });
  }

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={fieldFor}>
        <span className="label-text">{fieldFor}</span>
      </label>
      <div className="relative">
        <input
          autoFocus={autoFocus || false}
          id={fieldFor}
          value={value.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder={`Type your ${fieldFor.toLowerCase()}`}
          className="input input-bordered w-full pe-12"
          autoComplete="true"
        />

        <button
          type="button"
          className="btn btn-ghost absolute right-0 top-0 bottom-0"
          onClick={() => setShowPassword((preValue) => !preValue)}
        >
          {showPassword ? <Eye /> : <EyeSlash />}
        </button>
      </div>
      <label className="label">
        <span className={`label-text-alt text-error ${!errorMsg && "hidden"}`}>
          {errorMsg}
        </span>
      </label>
    </div>
  );
}
