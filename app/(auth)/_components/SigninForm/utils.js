export function validateData({ name, password }) {
  const error = {
    nameError: { message: "" },
    passwordError: { message: "" },
  };

  // check to ensure all values are not empty
  // if empty, error message is "required".
  if (!name || !password) {
    const nameEmpty = !name || false;
    const passwordEmpty = !password || false;

    if (nameEmpty) error.nameError.message = "required";
    if (passwordEmpty) error.passwordError.message = "required";

    throw error;
  }

  return true;
}
