export default function SelectFormControl({
  fieldFor,
  options,
  errorMsg,
  value,
  onChange,
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

      <div className="w-full">
        <select
          className="select select-primary w-full"
          id={fieldFor}
          name={fieldFor}
          defaultValue={value}
          onChange={handleChange}
        >
          <option disabled value={""}>
            {fieldFor}
          </option>
          {options.map((option, index) => (
            <option key={option + index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <label className="label">
        <span className={`label-text-alt text-error ${!errorMsg && "hidden"}`}>
          {errorMsg}
        </span>
      </label>
    </div>
  );
}
