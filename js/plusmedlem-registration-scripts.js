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

phone.addEventListener("focus", function () {
  hideErrorFor(phone);
  phone.closest(".pml-input-field").classList.add("active");
});
phone.addEventListener("input", function () {
  const value = this.value.replace(/\D/g, "");
  this.value = value.slice(0, 8);
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
  // phone.parentElement.classList.remove("active");
  let phoneValue = phone.value;
  if (phoneValue === "") {
    setErrorFor(phone, "Telefonnummeret må ikke være tomt"); //Phone number cannot be blank
    isValid = false;
  } else if (phoneValue !== "" && phoneValue.length < 8) {
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
  let formControl = input.closest(".pml-input-field");
  let errorElement = formControl.querySelector(".pml-error-text");
  if (!formControl.classList.contains("error")) {
    formControl.classList.add("error");
  }
  if (errorElement) {
    errorElement.innerText = message;
  }
}

function hideErrorFor(input) {
  let formControl = input.closest(".pml-input-field");
  if (formControl.classList.contains("error")) {
    formControl.classList.remove("error");
  }
  if (formControl.querySelector(".pml-error-text").innerHTML.length) {
    formControl.querySelector(".pml-error-text").innerHTML = "";
  }
}

// If there is no error in input
function setSuccessFor(input) {
  let formControl = input.closest(".pml-input-field");
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
