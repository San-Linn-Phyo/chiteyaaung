export default function NameField({ value, onChange, errorMessage, disabled }) {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="name">
        <span className="label-text">Name</span>
      </label>
      <input
        id="name"
        value={value}
        onChange={onChange}
        disabled={disabled}
        type="text"
        placeholder="Type your name here"
        className="input input-bordered w-full"
      />
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    </div>
  );
}
