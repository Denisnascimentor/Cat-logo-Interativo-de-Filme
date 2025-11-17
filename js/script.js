import { listMovies, getDetailsById } from "./api.js";


const catalog = document.getElementById("catalog");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const pageView = document.getElementById("page");
const backHome = document.getElementById("home");
const closeBtn = document.getElementById("close-btn");
const details = document.getElementById("details");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const wrapper = document.querySelector(".select-wrapper");
const trigger = wrapper.querySelector(".select-trigger");
const options = wrapper.querySelector(".options");
const allOptions = wrapper.querySelectorAll(".option");

let currentPage = 1;
let currentSearchTerm = "";
let currentGenre = "";


document.addEventListener("DOMContentLoaded", () => {
  trigger.addEventListener("click", () => {
    options.classList.toggle("open");
  });

  allOptions.forEach(option => {
    option.addEventListener("click", () => {

      trigger.textContent = option.textContent;
    
      currentGenre = option.dataset.value || "";
      options.classList.remove("open");
    });
  });

  window.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      options.classList.remove("open");
    }
  });
});



async function renderCatalog(page = 1, searchTerm = "", genreFilter = "") {
  catalog.innerHTML = `<div class="placeholder"><p>Carregando...</p></div>`;

  let items = await listMovies(page, searchTerm);

  if (genreFilter) {
    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const details = await getDetailsById(item.imdbID);
        return { ...item, DetailsGenre: details.Genre || "" };
      })
    );

    items = detailedItems.filter(item => {
      const g = (item.DetailsGenre || "").toLowerCase();
    
      return g.includes(genreFilter.toLowerCase());
    });
  }

  catalog.innerHTML = "";
  if (!items.length) {
    catalog.innerHTML = `<div class="placeholder"><p>Nenhum resultado encontrado.</p></div>`;
    return;
  }

  items.forEach(data => {
    const card = document.createElement("div");
    card.classList.add("catalog-card");
    const poster = data.Poster !== "N/A" ? data.Poster : "assets/no-poster.jpeg";

    card.innerHTML = `
      <img src="${poster}" class="movie-poster">
      <h3>${data.Title}</h3>
      <p>${data.Year}</p>
    `;

    card.addEventListener("click", async () => {
      const itemDetails = await getDetailsById(data.imdbID);
      openDetails(itemDetails);
    });

    catalog.appendChild(card);
  });

  window.scrollTo(0, 0);
}


function openDetails(data) {
  const poster = data.Poster !== "N/A" ? data.Poster : "assets/no-poster.jpeg";

  document.getElementById("poster").src = poster;
  document.getElementById("title").textContent = data.Title;
  document.getElementById("year").textContent = `Ano: ${data.Year}`;
  document.getElementById("genre").textContent = `Gênero: ${data.Genre}`;
  document.getElementById("plot").textContent = data.Plot;

  details.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  details.classList.add("hidden");
});

details.addEventListener("click", (e) => {
  if (e.target === details) {
    details.classList.add("hidden");
  }
});


function updatePageView() {
  pageView.textContent = `Página ${currentPage}`;
}

previousBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCatalog(currentPage, currentSearchTerm, currentGenre);
    updatePageView();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  renderCatalog(currentPage, currentSearchTerm, currentGenre);
  updatePageView();
});

backHome.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage = 1;
  currentSearchTerm = "";
  searchInput.value = "";
  renderCatalog(currentPage, currentSearchTerm, currentGenre);
  updatePageView();
});

function applySearchAndFilter() {
  currentSearchTerm = searchInput.value.trim();
  currentPage = 1;
  renderCatalog(currentPage, currentSearchTerm, currentGenre);
  updatePageView();
}

searchButton.addEventListener("click", () => {
  applySearchAndFilter();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    applySearchAndFilter();
  }
});



renderCatalog(currentPage, currentSearchTerm, currentGenre);
updatePageView();