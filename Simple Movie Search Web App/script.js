const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieDetails = document.getElementById('movieDetails');

const apiKey = 'f0127a73'; // Replace with your actual API key

// Function to fetch movie data from the OMDB API
async function fetchMovieData() {
    const searchQuery = searchInput.value.trim();

    if (searchQuery === '') {
        alert('Please enter a movie title.');
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();

        if (data.Response === 'False') {
            movieDetails.innerHTML = '<p>Movie not found!</p>';
        } else {
            const { Title, Year, Poster, Plot } = data;

            movieDetails.innerHTML = `
                <h2>${Title} (${Year})</h2>
                <img src="${Poster}" alt="${Title} Poster">
                <p>${Plot}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        movieDetails.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

// Event listener for the search button
searchButton.addEventListener('click', fetchMovieData);

// Event listener for pressing Enter in the input field
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchMovieData();
    }
});
