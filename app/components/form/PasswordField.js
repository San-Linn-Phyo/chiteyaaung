"use client";

import { Eye } from "@/app/assets/icons/Eye";
import { EyeSlash } from "@/app/assets/icons/EyeSlash";
import { useState } from "react";

export default function PasswordField({
  onChange,
  value,
  errorMessage,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordMode() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="form-control">
      <label className="label" htmlFor="password">
        <span className="label-text">Password</span>
      </label>
      <div className="relative">
        <input
          id="password"
          type={!showPassword ? "password" : "text"}
          className="input input-bordered w-full pe-16"
          placeholder="Type your password here"
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        <button
          className="btn btn-ghost absolute right-0 top-0 bottom-0"
          type="button"
          onClick={togglePasswordMode}
          disabled={disabled}
        >
          {!showPassword ? <EyeSlash /> : <Eye />}
        </button>
      </div>
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    </div>
  );
}
