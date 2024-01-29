const Allinputs = document.querySelectorAll("input");
const button = document.getElementById("btnRegister");
const span = document.getElementById("span");
let isvalid = false;

span.addEventListener("click", function () {
  window.location = "./index.html";
});
//prevent event
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (isvalid === true) {
    setdata();
  }
});

document.querySelector("form").addEventListener("input", function () {
  if (
    validationname(Allinputs[0]) &&
    validationname(Allinputs[1]) &&
    validationemail() &&
    validationpass() &&
    validationage()
  ) {
    isvalid = true;
  } else {
    isvalid = false;
  }
});

function setdata() {
  const user = {
    first_name: Allinputs[0].value,
    last_name: Allinputs[1].value,
    email: Allinputs[2].value,
    password: Allinputs[3].value,
    age: Allinputs[4].value,
  };
  console.log(user);
  registration(user);
}
async function registration(userData) {
  const Api = await fetch(`https://movies-api.routemisr.com/signup`, {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const respose = await Api.json();
  console.log(respose);
  if (respose.message === "success") {
    location.href = "./index.html";
  } else {
    document.getElementById("error").innerHTML = respose.errors?.email.message;
  }
}
function validationname(input) {
  const regx =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regx.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
function validationemail() {
  const regx =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regx.test(Allinputs[2].value)) {
    Allinputs[2].classList.add("is-valid");
    Allinputs[2].classList.remove("is-invalid");
    return true;
  } else {
    Allinputs[2].classList.add("is-invalid");
    Allinputs[2].classList.remove("is-valid");
    return false;
  }
}

function validationpass() {
  const regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regx.test(Allinputs[3].value)) {
    Allinputs[3].classList.add("is-valid");
    Allinputs[3].classList.remove("is-invalid");
    return true;
  } else {
    Allinputs[3].classList.add("is-invalid");
    Allinputs[3].classList.remove("is-valid");
    return false;
  }
}
function validationage() {
  const regx = /^([1-7][0-9]|80)$/;
  if (regx.test(Allinputs[4].value)) {
    Allinputs[4].classList.add("is-valid");
    Allinputs[4].classList.remove("is-invalid");
    return true;
  } else {
    Allinputs[4].classList.add("is-invalid");
    Allinputs[4].classList.remove("is-valid");
    return false;
  }
}
let mode = document.getElementById("mode");

document.getElementById("mode").addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
    document.documentElement.setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");
  }
});
