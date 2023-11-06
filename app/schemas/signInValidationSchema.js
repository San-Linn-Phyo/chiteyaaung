import * as yup from "yup";

export const signInValidationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3.")
    .required("Name is required."),

  password: yup
    .string()
    .min(5, "Password must be at least 5.")
    .required("Password is required."),
});
