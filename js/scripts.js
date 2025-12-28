// select Inputs
const usernameInput = document.getElementById("username");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// select form, form button and success message
const form = document.querySelector("form");
const formButton = document.querySelector("form button");
const successMessage = document.querySelector(".success-message");

// select error messages elements and their icons
const [usernameMessage, fullNameMessage, emailMessage] =
  document.querySelectorAll(".validation");
const [strengthMessage, emailNameMessage, lengthMessage, numberSymbolMessage] =
  document.querySelectorAll(".pass-validations span");
const [
  strengthMessageIcon,
  emailNameMessageIcon,
  lengthMessageIcon,
  numberSymbolMessageIcon,
] = document.querySelectorAll(".pass-validations i");

// define events on inputs
usernameInput.addEventListener("input", usernameValidation);
fullNameInput.addEventListener("input", fullNameValidation);
emailInput.addEventListener("input", emailValidation);
passwordInput.addEventListener("input", passwordValidation);

// define event on form
form.addEventListener("submit", onSubmitForm);

// define helper variables
let fullNameValue = "";
let emailValue = "";

let isFormFiledValid = {
  username: false,
  fullName: false,
  email: false,
  password: false,
};
let fieldsValue = {
  username: "",
  fullName: "",
  email: "",
  password: "",
};

// define event handlers for inputs
function usernameValidation(event) {
  const value = event.target.value;

  successMessage.style.display = "none";

  const characters = value.length;
  const alphanumericRegEx = new RegExp("^[a-zA-Z0-9]+$");

  const isValid =
    characters > 3 && characters < 15 && alphanumericRegEx.test(value);

  isFormFiledValid.username = isValid;
  fieldsValue.username = value;

  if (characters <= 3 || characters >= 15) {
    usernameMessage.innerText = "Username must be between 3 and 15 characters";
  } else if (!alphanumericRegEx.test(value)) {
    usernameMessage.innerText = "Username can only contain letters and numbers";
  } else {
    usernameMessage.innerText = "";
  }
  isValid
    ? (usernameInput.style.borderColor = "rgba(70, 95, 241, 0.4)")
    : (usernameInput.style.borderColor = "rgba(220, 38, 38, 1)");

  if (
    !isFormFiledValid.username ||
    !isFormFiledValid.fullName ||
    !isFormFiledValid.email ||
    !isFormFiledValid.password
  ) {
    formButton.setAttribute("disabled", "");
    formButton.classList.add("disabled");
  } else {
    formButton.removeAttribute("disabled");
    formButton.classList.remove("disabled");
  }
}

function fullNameValidation(event) {
  const value = event.target.value;
  successMessage.style.display = "none";

  const alphabeticRegEx = new RegExp("^[a-zA-Z ]+$");
  const firstLastRegEx = new RegExp("\\S+\\s+\\S+");

  const isValid = alphabeticRegEx.test(value) && firstLastRegEx.test(value);

  fullNameValue = value;
  isFormFiledValid.fullName = isValid;
  fieldsValue.fullName = value;

  if (!firstLastRegEx.test(value)) {
    fullNameMessage.innerText = "Please enter your full name";
  } else if (!alphabeticRegEx.test(value)) {
    fullNameMessage.innerText =
      "Full name must contain only letters and spaces";
  } else {
    fullNameMessage.innerText = "";
  }
  isValid
    ? (fullNameInput.style.borderColor = "rgba(70, 95, 241, 0.4)")
    : (fullNameInput.style.borderColor = "rgba(220, 38, 38, 1)");

  if (
    !isFormFiledValid.username ||
    !isFormFiledValid.fullName ||
    !isFormFiledValid.email ||
    !isFormFiledValid.password
  ) {
    formButton.setAttribute("disabled", "");
    formButton.classList.add("disabled");
  } else {
    formButton.removeAttribute("disabled");
    formButton.classList.remove("disabled");
  }
}

function emailValidation(event) {
  const value = event.target.value;
  successMessage.style.display = "none";

  const emailRegEx = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.com$");

  const isValid = emailRegEx.test(value);

  emailValue = value;
  isFormFiledValid.email = isValid;
  fieldsValue.email = value;

  if (!emailRegEx.test(value)) {
    emailMessage.innerText = "Please enter a valid email address";
    emailInput.style.borderColor = "rgba(220, 38, 38, 1)";
  } else {
    emailMessage.innerText = "";
    emailInput.style.borderColor = "rgba(70, 95, 241, 0.4)";
  }

  if (
    !isFormFiledValid.username ||
    !isFormFiledValid.fullName ||
    !isFormFiledValid.email ||
    !isFormFiledValid.password
  ) {
    formButton.setAttribute("disabled", "");
    formButton.classList.add("disabled");
  } else {
    formButton.removeAttribute("disabled");
    formButton.classList.remove("disabled");
  }
}

function passwordValidation(event) {
  const value = event.target.value;
  successMessage.style.display = "none";

  const characters = value.length;
  const [firstName = ""] = fullNameValue.split(" ");
  const [usernamePart = "", serverPart = ""] = emailValue.split("@");
  const numberSymbolRegEx = new RegExp(
    "^(?=.*[0-9!@#$%^&*()_+{}\\[\\]:;\"'<>,.?\\/\\\\|]).*$"
  );

  const isEmailNameValid =
    !value.includes(firstName) &&
    !value.includes(usernamePart) &&
    !value.includes(serverPart);
  const isLengthValid = characters > 8;
  const isNumberSymbolValid = numberSymbolRegEx.test(value);
  const isWeak = !isEmailNameValid && !isLengthValid && !isNumberSymbolValid;

  const isValid =
    !isWeak && isEmailNameValid && isLengthValid && isNumberSymbolValid;

  isFormFiledValid.password = isValid;
  fieldsValue.password = value;

  if (isWeak) {
    strengthMessage.style.color = "rgba(220, 38, 38, 1)";
    strengthMessageIcon.style.color = "rgba(220, 38, 38, 1)";
  } else {
    strengthMessage.style.color = "rgba(21, 128, 61, 1)";
    strengthMessageIcon.style.color = "rgba(21, 128, 61, 1)";
  }
  if (firstName === "" || usernamePart === "" || serverPart === "") {
    emailNameMessage.style.color = "rgba(220, 38, 38, 1)";
    emailNameMessageIcon.style.color = "rgba(220, 38, 38, 1)";
  } else {
    if (
      value.includes(firstName) ||
      value.includes(usernamePart) ||
      value.includes(serverPart)
    ) {
      emailNameMessage.style.color = "rgba(220, 38, 38, 1)";
      emailNameMessageIcon.style.color = "rgba(220, 38, 38, 1)";
    } else {
      emailNameMessage.style.color = "rgba(21, 128, 61, 1)";
      emailNameMessageIcon.style.color = "rgba(21, 128, 61, 1)";
    }
  }
  if (characters <= 8) {
    lengthMessage.style.color = "rgba(220, 38, 38, 1)";
    lengthMessageIcon.style.color = "rgba(220, 38, 38, 1)";
  } else {
    lengthMessage.style.color = "rgba(21, 128, 61, 1)";
    lengthMessageIcon.style.color = "rgba(21, 128, 61, 1)";
  }
  if (!numberSymbolRegEx.test(value)) {
    numberSymbolMessage.style.color = "rgba(220, 38, 38, 1)";
    numberSymbolMessageIcon.style.color = "rgba(220, 38, 38, 1)";
  } else {
    numberSymbolMessage.style.color = "rgba(21, 128, 61, 1)";
    numberSymbolMessageIcon.style.color = "rgba(21, 128, 61, 1)";
  }

  isValid
    ? (passwordInput.style.borderColor = "rgba(21, 128, 61, 1)")
    : (passwordInput.style.borderColor = "rgba(220, 38, 38, 1)");

  if (
    !isFormFiledValid.username ||
    !isFormFiledValid.fullName ||
    !isFormFiledValid.email ||
    !isFormFiledValid.password
  ) {
    formButton.setAttribute("disabled", "");
    formButton.classList.add("disabled");
  } else {
    formButton.removeAttribute("disabled");
    formButton.classList.remove("disabled");
  }
}

// define event handler for form submittion
function onSubmitForm(event) {
  event.preventDefault();

  successMessage.style.display = "block";
  usernameInput.value = "";
  fullNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  passwordInput.style.borderColor = "rgba(156, 154, 165, 1)";
  strengthMessage.style.color = "rgba(156, 154, 165, 1)";
  strengthMessageIcon.style.color = "rgba(156, 154, 165, 1)";
  emailNameMessage.style.color = "rgba(156, 154, 165, 1)";
  emailNameMessageIcon.style.color = "rgba(156, 154, 165, 1)";
  lengthMessage.style.color = "rgba(156, 154, 165, 1)";
  lengthMessageIcon.style.color = "rgba(156, 154, 165, 1)";
  numberSymbolMessage.style.color = "rgba(156, 154, 165, 1)";
  numberSymbolMessageIcon.style.color = "rgba(156, 154, 165, 1)";

  console.log({
    username: fieldsValue.username,
    fullName: fieldsValue.fullName,
    email: fieldsValue.email,
    password: fieldsValue.password.replace(/./g, "*"),
  });
}
