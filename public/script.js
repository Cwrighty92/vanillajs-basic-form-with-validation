const form = document.getElementById("form");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const email = document.getElementById("email");
const username = document.getElementById("username");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function getCapiltilisedFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}


function checkIsInputRequired(inputArr) {
  inputArr.forEach(function (input) {
    console.log(input);
    if (input.value.trim() === "") {
      showError(input, `${getCapiltilisedFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkPasswordsMatch(password, password2) {
  if(password.value !== password2.value) {
    showError(password2, "Passwords do not match")
  } 
}


function checkInputLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getCapiltilisedFieldName(input)}, must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getCapiltilisedFieldName(input)}, must be at less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkIsInputRequired([username, email, password, password2]);
  checkInputLength(username, 3, 15);
  checkInputLength(password, 6, 20);
  checkEmail(email)
  checkPasswordsMatch(password, password2)
});
