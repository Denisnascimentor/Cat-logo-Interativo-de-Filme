const apiKey = "289a0351";
const catalog = document.getElementById("catalog");

function listarFilmes() {
  const ano = new Date().getFullYear();
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=${ano}&type=movie&page=1`

  // catalog.innerHTML = "<p>carregando filmes...<p>";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        catalog.innerHTML = `<p>${data.Error}<p>`;
        return;
      }

      catalog.innerHTML = "";

      data.Search.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("catalog-card");


        const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x220?text=Sem+Imagem";

        card.innerHTML = `<img src="${poster}" alt="${movie.Title}" class="movie-poster">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>`;


        catalog.appendChild(card);
      });
    })
    .catch(erro => {
      console.error(erro);
      catalog.innerHTML = "<p>Erro ao buscar Filmes.<p>"
    });
}

listarFilmes();