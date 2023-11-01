import { useState } from "react";

export default function NumberFormControl({
  fieldFor,
  onChange,
  errorMsg,
  autoFocus,
}) {
  const [value, setValue] = useState();

  function handleChange(e) {
    const age = e.target.value;
    const { fun, key } = onChange;

    if (age.trim() === "") {
      setValue(age.trim());
      fun((preValue) => {
        const newValue = { ...preValue };
        newValue[key] = age.trim();
        return newValue;
      });
      return;
    }
    if (isNaN(Number(age))) return;
    setValue(age);
    fun((preValue) => {
      const newValue = { ...preValue };
      newValue[key] = age;
      return newValue;
    });
  }

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={fieldFor}>
        <span className="label-text">{fieldFor}</span>
      </label>

      <input
        autoFocus={autoFocus || false}
        value={value || ""}
        onChange={handleChange}
        id={fieldFor}
        type="text"
        placeholder={`Type your ${fieldFor.toLowerCase()}`}
        className="input input-bordered w-full"
      />

      <label className="label">
        <span className={`label-text-alt text-error ${!errorMsg && "hidden"}`}>
          {errorMsg}
        </span>
      </label>
    </div>
  );
}
