"use client";

import { useState } from "react";

export default function NumberField({
  id,
  disabled,
  placeholder,
  setFieldValue,
  allowStartingWithZero,
}) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const acceptedValue = e.target.value.trim();
    const isNumber = Number(acceptedValue);
    let isValid = false;

    if (acceptedValue.trim() === "") isValid = true;
    else if (allowStartingWithZero && isNumber >= 0) isValid = isNumber >= 0;
    else if (!allowStartingWithZero && !acceptedValue.startsWith("0"))
      isValid = isNumber > 0;

    if (isValid) {
      setValue(acceptedValue);
      setFieldValue(acceptedValue);
    }
  }

  return (
    <input
      id={id}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full"
    />
  );
}
