const apiKey = "289a0351";
const catalog = document.getElementById("catalog");
let count = 1;
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const pageView = document.getElementById("page")
const backHome = document.getElementById("home");

async function listarFilmes() {
  const year = new Date().getFullYear();
  const urlMovies = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&y=${year}&page=${count}`;
  const urlSeries = `https://www.omdbapi.com/?apikey=${apiKey}&s=series&type=series&y=${year}&page=${count}`;

  const resMovies = await fetch(urlMovies).then(r => r.json());
  const resSeries = await fetch(urlSeries).then(r => r.json());

  // Junta os dois resultados (se existirem)
  const movies = resMovies.Search || [];
  const series = resSeries.Search || [];

  const fullItems = [...movies, ...series];

      catalog.innerHTML = "";

      fullItems.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("catalog-card");


        const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x220?text=Sem+Imagem";

        card.innerHTML = `<img src="${poster}" alt="${movie.Title}" class="movie-poster">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>`;


        catalog.appendChild(card);
      });

}

function pagination() {
  function previous() {
    if (count > 1) {
      count --;
      listarFilmes();

      pageView.textContent = `Página ${count}`;
    }
  }; 
  
  function next() {
    count ++;
    listarFilmes();

    pageView.textContent = `Página ${count}`;
  };

  function home() {
    count = 1;
    listarFilmes();
  }

  previousBtn.addEventListener("click", previous);
  nextBtn.addEventListener("click", next);
  backHome.addEventListener("click", home);
}


listarFilmes();
pagination();
