export const apiKey = "289a0351";


export async function listMovies(page = 1, searchTerm = "") {
  const year = new Date().getFullYear();

 
  const baseQuery = searchTerm ? `&s=${encodeURIComponent(searchTerm)}` : "&s=movie";

  const urlMovies = `https://www.omdbapi.com/?apikey=${apiKey}${baseQuery}&type=movie&y=${year}&page=${page}`;
  const urlSeries = `https://www.omdbapi.com/?apikey=${apiKey}${baseQuery}&type=series&y=${year}&page=${page}`;

  const [resMovies, resSeries] = await Promise.all([
    fetch(urlMovies).then(r => r.json()),
    fetch(urlSeries).then(r => r.json())
  ]);

  const movies = resMovies.Search || [];
  const series = resSeries.Search || [];

  const fullItems = [...movies, ...series];

  return fullItems;
}

export async function getDetailsById(id) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
  const data = await fetch(url).then(res => res.json());
  return data;
}