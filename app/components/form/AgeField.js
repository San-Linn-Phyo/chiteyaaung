import NumberField from "../helper/NumberField";

export default function AgeField({ setFieldValue, errorMessage, disabled }) {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="age">
        <span className="label-text">Age</span>
      </label>
      <NumberField
        id="age"
        setFieldValue={(value) => setFieldValue("age", value)}
        placeholder="Type your age here"
        disabled={disabled}
      />
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    </div>
  );
}
