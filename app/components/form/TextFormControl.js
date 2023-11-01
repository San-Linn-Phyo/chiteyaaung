export default function TextFormControl({
  fieldFor,
  value,
  onChange,
  errorMsg,
  autoFocus,
}) {
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
      <input
        autoFocus={autoFocus || false}
        id={fieldFor}
        value={value}
        onChange={handleChange}
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
