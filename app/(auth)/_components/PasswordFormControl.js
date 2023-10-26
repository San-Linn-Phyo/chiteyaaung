export default function PasswordFormControl({
  fieldFor,
  placeholder,
  value,
  setValue,
  errorMsg,
}) {
  function handleChange(e) {
    return setValue({ ...value, password: e.target.value });
  }

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{fieldFor}</span>
      </label>
      <input
        value={value.password}
        onChange={handleChange}
        type="password"
        placeholder={placeholder}
        className="input input-bordered w-full"
        autoComplete="true"
      />
      <label className="label">
        <span
          className={`label-text-alt text-error ${!errorMsg ? "hidden" : null}`}
        >
          {errorMsg === "required" ? `${fieldFor} field is required` : null}
          {errorMsg === "invalid" ? `Invalid ${fieldFor} value` : null}
        </span>
      </label>
    </div>
  );
}
