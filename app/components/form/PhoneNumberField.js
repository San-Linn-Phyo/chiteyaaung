import NumberField from "../helper/NumberField";

export default function PhoneNumberField({
  setFieldValue,
  errorMessage,
  disabled,
}) {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="phoneNumber">
        <span className="label-text">Phone Number</span>
      </label>
      <NumberField
        id="phoneNumber"
        setFieldValue={(value) => setFieldValue("phoneNumber", value)}
        placeholder="Type your phone number here"
        disabled={disabled}
        allowStartingWithZero={true}
      />
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    </div>
  );
}
