document.getElementById("contactForm").addEventListener("submit", function (e) {

  let isValid = true;

  // Get input values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const comments = document.getElementById("comments").value.trim();

  // Get error elements
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const commentsError = document.getElementById("commentsError");

  // Clear previous errors
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  commentsError.textContent = "";

  // First name validation
  if (firstName === "") {
    firstNameError.textContent = "First name is required";
    isValid = false;
  }

  // Last name validation
  if (lastName === "") {
    lastNameError.textContent = "Last name is required";
    isValid = false;
  }

  // Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  if (email === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  }

  // Comments validation
  if (comments === "") {
    commentsError.textContent = "Comments cannot be empty";
    isValid = false;
  }

  // Prevent submission if invalid
  if (!isValid) {
    e.preventDefault();
  }

});