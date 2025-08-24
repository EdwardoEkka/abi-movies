const apiKey = "2a10a0ab87a04d94f36cab1f257bc9e2";

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Fetch error:", error));
