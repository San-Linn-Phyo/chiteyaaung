import * as yup from "yup";

const accountDetail = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3.")
    .required("Name is required."),

  phoneNumber: yup
    .string()
    .matches(/^(09|\\+?950?9|\\+?95950?9)\d{7,9}$/, "Invalid phone number.")
    .required("Phone Number is required."),

  password: yup
    .string()
    .min(5, "Password must be at least 5.")
    .required("Password is required."),
});

const profileDetail = yup.object({
  image: yup
    .mixed()
    .test(
      "Please provide a supported file type: png, jpeg.",
      "Unsupported Format. Use png or jpeg.",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    )
    .required("Profile image is required."),

  age: yup
    .number("Age must be number.")
    .min(1, "Age must be at least 1 year.")
    .max(50, "Age must be less than 50 years.")
    .required("Age is required."),

  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Gender must be male or female.")
    .required("Gender is required."),
});

export const signUpValidationSchema = [accountDetail, profileDetail];
