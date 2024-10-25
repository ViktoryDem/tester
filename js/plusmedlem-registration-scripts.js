"use strict";
let form = document.getElementById("pml-form");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let terms = document.getElementById("terms");
let isValid = true;
// Event listener to submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateRegistrationForm();
});
email.addEventListener("focus", function () {
  hideErrorFor(email);
});
phone.addEventListener("input", function (e) {
  let value = phone.value;
  if (value.length < 3 || value.slice(0, 3) !== "+45") {
    phone.value =
      "+45" +
      value
        .slice(3)
        .replace(/[^0-9]/g, "")
        .slice(0, 8);
  } else if (value.length > 3) {
    phone.value =
      "+45" +
      value
        .slice(3)
        .replace(/[^0-9]/g, "")
        .slice(0, 8);
  }
});
phone.addEventListener("focus", function () {
  hideErrorFor(phone);
  if (phone.value === "") {
    phone.value = "+45";
  }
});
phone.addEventListener("blur", function () {
  if (phone.value === "+45") {
    phone.value = "";
  }
});

function validateRegistrationForm() {
  validateEmail();
  validatePhoneNumber();
  validateTerms();
  // Execute postData() function if there are no errors
  if (isValid) {
    postData();
  }
}

function validateEmail() {
  let emailValue = email.value.trim();
  if (emailValue === "") {
    setErrorFor(email, "E-mail må ikke være tom"); //Email cannot be blank
    isValid = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "E-mail er ikke gyldig"); //Email is not valid
    isValid = false;
  } else {
    setSuccessFor(email);
  }
}

function validatePhoneNumber() {
  let phoneValue = phone.value.trim();
  console.log(phoneValue);
  if (phoneValue === "" || phoneValue.length <= 3) {
    setErrorFor(phone, "Telefonnummeret må ikke være tomt"); //Phone number cannot be blank
    isValid = false;
  } else if (phoneValue.length < 11) {
    setErrorFor(phone, "Telefonnummeret er ikke gyldigt"); //Phone number is not valid
    isValid = false;
  } else {
    setSuccessFor(phone);
  }
}

function validateTerms() {
  if (!terms.checked) {
    setErrorFor(terms, "Du bør acceptere vilkårene"); //You should accept terms
    isValid = false;
  } else {
    setSuccessFor(terms);
  }
}

// If there is some error in input
function setErrorFor(input, message) {
  let formControl = input.parentElement;
  let errorElement = formControl.querySelector(".pml-error-text");
  if (!formControl.classList.contains("error")) {
    formControl.classList.add("error");
  }
  if (errorElement) {
    errorElement.innerText = message;
  }
}

function hideErrorFor(input) {
  let formControl = input.parentElement;
  if (formControl.classList.contains("error")) {
    formControl.classList.remove("error");
  }
  if (formControl.querySelector(".pml-error-text").innerHTML.length) {
    formControl.querySelector(".pml-error-text").innerHTML = "";
  }
}

// If there is no error in input
function setSuccessFor(input) {
  let formControl = input.parentElement;
  let errorElement = formControl.querySelector(".pml-error-text");
  if (errorElement) {
    errorElement.innerText = "";
  }
  if (formControl.classList.contains("error")) {
    formControl.classList.remove("error");
  }
}

// To check if email is valid or not
function isEmail(email) {
  const re = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Dummy postData function for demonstration purposes
function postData() {
  console.log("Form submitted successfully!");
}
