export default function TextFormControl({
  fieldFor,
  placeholder,
  value,
  setValue,
  errorMsg,
}) {
  function handleChange(e) {
    if (fieldFor === "Name")
      return setValue({ ...value, name: e.target.value });

    return setValue({ ...value, phoneNumber: e.target.value });
  }

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{fieldFor}</span>
      </label>
      <input
        value={fieldFor === "Name" ? value.name : value.phoneNumber}
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
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
