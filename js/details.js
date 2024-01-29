const search = location.search;
const parm = new URLSearchParams(search);
const id = parm.get("id");

let Details = {};

(async function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6dc4955b9msh938cbffced1a12cp16bd02jsn80ad39dcd596",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const Api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );

  const response = await Api.json();
  //   console.log(response);
  Details = response;
  Display();
})();

function Display() {
  const box = ` <div class="col-md-4">
  <figure>
     <img src="${Details.thumbnail}" class="w-100" alt="details image" />

  </figure>
</div>
<div class="col-md-8">

  <div>
     <nav aria-label="breadcrumb">
        <ol class="breadcrumb" class="">
           <li class="breadcrumb-item text-reset"><a class="text" href="./home.html">Home</a></li>
           <li class="breadcrumb-item text-info" aria-current="page">${Details.title}</li>
        </ol>
     </nav>

     <h1 class="">${Details.title}</h1>

     <h3 class="">About ${Details.title}</h3>
     <p class="">${Details.description}</p>

     
  </div>
</div>
`;
  document.getElementById("details").innerHTML = box;
  const background = Details.thumbnail.replace("thumbnail", "background");
  document.body.style.cssText = `
  background-image:url('${background}') ;
  background-size:cover;
  background-position:center; 
  background-repeat: no-repeat;
  `;
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
