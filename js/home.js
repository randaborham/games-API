const loading = document.querySelector(".loading");

document.querySelectorAll(".ul-nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".ul-nav .active").classList.remove("active");
    link.classList.add("active");
    const categ = link.getAttribute("data-categ");
    setgame(categ);
  });
});
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("usertoken");
  location.href = "./index.html";
});

async function setgame(name) {
  loading.classList.remove("d-none"); //show loading
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6dc4955b9msh938cbffced1a12cp16bd02jsn80ad39dcd596",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const Api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${name}`,
    options
  );
  const respose = await Api.json();
  console.log(respose);
  display(respose);
  loading.classList.add("d-none"); // hide loading
}
setgame("mmorpg");

function display(games) {
  let col = ``;
  for (let i = 0; i < games.length; i++) {
    let Path = games[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    col += `<div class="col-lg-3">
        <div
          onmouseleave="stopVideo(event)"
          onmouseenter="startVideo(event)" 
         onclick="detsils(${games[i].id})"
          class="card h-100 bg-transparent"
          role="button"
        >
          <div class="card-body">
            <figure class="position-relative">
              <img
                class="card-img-top object-fit-cover h-100"
                src="${games[i].thumbnail}"
              />

              <video muted="true"  preload="none" loop  class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${Path}">
              </video>
  
            </figure>
      
            <figcaption>
              <div class="hstack justify-content-between">
                <h3 class="h6 small">${games[i].title}</h3>
                <span class="badge text-bg-primary p-2">Free</span>
              </div>
      
              <p class="card-text small text-center opacity-50 mt-2">
                ${games[i].short_description}
              </p>
            </figcaption>
          </div>
      
          <footer class="card-footer small hstack justify-content-between">
            <span class="badge badge-color bg-dark">${games[i].genre}</span>
            <span class="badge badge-color bg-dark">${games[i].platform}</span>
          </footer>
        </div>
      </div>`;
  }

  document.getElementById("game").innerHTML = col;
}

function startVideo(event) {
  const currentvideo = event.target.querySelector("video");
  currentvideo.classList.remove("d-none");
  console.log(event.target.querySelector("video"));
  currentvideo.muted = true;
  currentvideo.play();
}
function stopVideo(event) {
  const currentvideo = event.target.querySelector("video");
  currentvideo.classList.add("d-none");
  console.log(event.target.querySelector("video"));
  currentvideo.muted = true;
  currentvideo.pause();
}
function detsils(id) {
  window.location = `./details.html?id=${id}`;
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
