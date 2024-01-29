const Allinputs = document.querySelectorAll("input");
const button = document.getElementById("btnlogin");
let isvalid = false;
const span = document.getElementById("span");

span.addEventListener("click", function () {
  window.location = "./registration.html";
  console.log(span);
});
//prevent event
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (isvalid === true) {
    setdata();
  }
});

document.querySelector("form").addEventListener("input", function () {
  if (validationemail() && validationpass()) {
    isvalid = true;
  } else {
    isvalid = false;
  }
});

function setdata() {
  const user = {
    email: Allinputs[0].value,
    password: Allinputs[1].value,
  };
  console.log(user);
  loginform(user);
}
async function loginform(userData) {
  const Api = await fetch(`https://movies-api.routemisr.com/signin`, {
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
    localStorage.setItem("usertoken", respose.token);
    location.href = "./home.html";
  } else {
    document.getElementById("error").innerHTML = respose.message;
  }
}
function validationemail() {
  const regx =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regx.test(Allinputs[0].value)) {
    Allinputs[0].classList.add("is-valid");
    Allinputs[0].classList.remove("is-invalid");
    return true;
  } else {
    Allinputs[0].classList.add("is-invalid");
    Allinputs[0].classList.remove("is-valid");
    return false;
  }
}
function validationpass() {
  const regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regx.test(Allinputs[1].value)) {
    Allinputs[1].classList.add("is-valid");
    Allinputs[1].classList.remove("is-invalid");
    return true;
  } else {
    Allinputs[1].classList.add("is-invalid");
    Allinputs[1].classList.remove("is-valid");
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
