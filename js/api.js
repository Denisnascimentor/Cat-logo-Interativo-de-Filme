const apiKey = "289a0351";
const catalog = document.getElementById("catalog");
let count = 1;
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const pageView = document.getElementById("page")
const backHome = document.getElementById("home");
const closeBtn = document.getElementById("close-btn");
const details = document.getElementById("details");

async function listMovies() {
  const year = new Date().getFullYear();
  const urlMovies = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&y=${year}&page=${count}`;
  const urlSeries = `https://www.omdbapi.com/?apikey=${apiKey}&s=series&type=series&y=${year}&page=${count}`;

  const resMovies = await fetch(urlMovies).then(r => r.json());
  const resSeries = await fetch(urlSeries).then(r => r.json());

  const movies = resMovies.Search || [];
  const series = resSeries.Search || [];

  const fullItems = [...movies, ...series];

  catalog.innerHTML = "";

  fullItems.forEach(data => {
    const card = document.createElement("div");
    card.classList.add("catalog-card");


    const poster = data.Poster !== "N/A" ? data.Poster : "img/no-poster.jpeg";

    card.innerHTML = `<img src="${poster}" class="movie-poster">
        <h3>${data.Title}</h3>
        <p>${data.Year}</p>`;

    card.addEventListener("click", () => {
      if (movies.Type === "series") {
        openDetailsSeries(data.imdbID);
      } else {
        openDetailsMovie(data.imdbID);
      }
    });

    catalog.appendChild(card);

    window.scrollTo(0, 0);
  });

}

function pagination() {
  function previous() {
    if (count > 1) {
      count--;
      listMovies();

      pageView.textContent = `Página ${count}`;

    }
  };

  function next() {
    count++;
    listMovies();

    pageView.textContent = `Página ${count}`;
  };

  function home() {
    count = 1;
    listMovies();
    pageView.textContent = `Página ${count}`
  }

  previousBtn.addEventListener("click", previous);
  nextBtn.addEventListener("click", next);
  backHome.addEventListener("click", home);
}


function openDetailsMovie(id) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("poster").src =
        data.Poster !== "N/A" ? data.Poster : "img/no-poster.jpeg";

      document.getElementById("title").textContent = data.Title;
      document.getElementById("year").textContent = `Ano: ${data.Year}`;
      document.getElementById("genre").textContent = `Gênero: ${data.Genre}`;
      document.getElementById("plot").textContent = data.Plot;

      details.classList.remove("hidden");
    })

  closeBtn.addEventListener("click", () => {
    document.getElementById("details").classList.add("hidden");

  });

  details.addEventListener('click', (e) => {
    if (e.target === details) {
      details.classList.add("hidden");
    }
  });

}




listMovies();
pagination();
