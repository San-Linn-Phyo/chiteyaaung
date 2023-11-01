function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return ["required"];
  }

  if (!phoneNumber.match(/^(09|\\+?950?9|\\+?95950?9)\d{7,9}$/)) {
    return ["invalid"];
  }
}

function validateName(name) {
  if (name.trim() === "") {
    return ["required"];
  }

  if (name.length < 3 || name.length > 30) {
    return ["between", { start: 3, end: 30 }];
  }
}

function validateAge(age) {
  console.log("Age: ", age);

  if (age.trim() === "") {
    return ["required"];
  }

  if (isNaN(Number(age))) {
    return ["invalid"];
  }

  if (age < 14 || age > 40) {
    return ["between", { start: 14, end: 40 }];
  }
}

function validateGender(gender) {
  const validGenders = ["Male", "Female", "Others"];

  console.log("Gender: ", gender);
  console.log(validGenders[gender]);

  if (gender.trim() === "") {
    return ["required"];
  }

  if (!validGenders.at(gender)) {
    return ["invalid"];
  }
}

function validatePassword(password) {
  if (password.trim() === "") {
    return ["required"];
  }

  if (password.length < 5) {
    return ["beyond", { start: 5 }];
  }
}

function validateImage(image) {
  if (!image) {
    return ["required"];
  }
}

function errorMessages(code, field) {
  const messages = {
    required: `${field} is required`,
    invalid: `${field} is invalid`,
    between: `${field} must be between ${code[1]?.start} and ${code[1]?.end}`,
    beyond: `${field} must be at least ${code[1]?.start}`,
  };

  return messages[code[0]];
}

function onError(errorCode, errorFor, result) {
  if (errorCode) {
    const field =
      errorFor.charAt(0).toLowerCase() +
      errorFor.slice(1).replaceAll(" ", "") +
      "Error";

    result.status = "fail";
    result.error = { ...result.error };
    result.error[field] = errorMessages(errorCode, errorFor);
  }
}

export default function validate({
  name,
  phoneNumber,
  age,
  gender,
  password,
  image,
}) {
  const result = { status: "pass" };

  if (name || name === "") {
    onError(validateName(name), "Name", result);
  }

  if (phoneNumber || phoneNumber === "") {
    onError(validatePhoneNumber(phoneNumber), "Phone Number", result);
  }

  if (age || age === "") {
    onError(validateAge(age), "Age", result);
  }

  if (gender || gender === "") {
    onError(validateGender(gender), "Gender", result);
  }

  if (password || password === "") {
    onError(validatePassword(password), "Password", result);
  }

  if (image || image === "") {
    onError(validateImage(image), "Image", result);
  }

  return result;
}
