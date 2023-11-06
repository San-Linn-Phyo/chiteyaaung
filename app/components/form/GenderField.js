export default function GenderField({
  errorMessage,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="gender">
        <span className="label-text">Gender</span>
      </label>
      <select
        className="select select-bordered"
        id="gender"
        defaultValue={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option disabled value="">
          Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    </div>
  );
}
