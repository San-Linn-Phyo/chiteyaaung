export function validatePhoneNumber(phoneNumber, error) {
  if (!phoneNumber.match(/^(09|\\+?950?9|\\+?95950?9)\d{7,9}$/)) {
    error.phoneNumberError.message = "invalid";
    throw error;
  }
}

export function validateData({ name, phoneNumber, password }) {
  const error = {
    nameError: { message: "" },
    phoneNumberError: { message: "" },
    passwordError: { message: "" },
  };

  // check to ensure all values are not empty
  // if empty, error message is "required".
  if (!name || !phoneNumber || !password) {
    const nameEmpty = !name || false;
    const phoneNumberEmpty = !phoneNumber || false;
    const passwordEmpty = !password || false;

    if (nameEmpty) error.nameError.message = "required";
    if (phoneNumberEmpty) error.phoneNumberError.message = "required";
    if (passwordEmpty) error.passwordError.message = "required";

    if (!phoneNumberEmpty) validatePhoneNumber(phoneNumber, error);

    throw error;
  }

  validatePhoneNumber(phoneNumber, error);

  return true;
}
