// Selecting form elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Input error messages
function showErrorMsg(input, msg) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const smallDiv = formControl.querySelector("small");
  smallDiv.innerText = msg;
}

// Success messages
function showSussessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check for valid username
function checkUsername(input) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (usernameRegex.test(input.value.trim())) {
    showSussessMsg(input);
  } else {
    showErrorMsg(
      input,
      `${getFieldName(input)} can only contains letters and numbers`
    );
  }
}

// Check for valid Email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSussessMsg(input);
  } else {
    showErrorMsg(input, "Email is not valid!");
  }
}

// Check for input length
function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength) {
    showErrorMsg(
      input,
      `${getFieldName(input)} must be at least ${minLength} characters!`
    );
  } else if (input.value.length > maxLength) {
    showErrorMsg(
      input,
      `${getFieldName(input)} must be less than ${maxLength} characters!`
    );
  } else {
    showSussessMsg(input);
  }
}

// Check for required fields
function checkRequiredField(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      showErrorMsg(input, `${getFieldName(input)} is required!`);
    } else {
      showSussessMsg(input);
    }
  });
}

// Check for matched password on both fields
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showErrorMsg(input2, `Passwords do not match!`);
  }
}

// get field name
function getFieldName(input) {
  //returt the capitalized 1st letter
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", event => {
  event.preventDefault();

  //check for required fields
  checkRequiredField([username, email, password, confirmPassword]);
  //check for length
  checkLength(username, 6, 25);
  checkLength(password, 6, 40);
  checkUsername(username);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
