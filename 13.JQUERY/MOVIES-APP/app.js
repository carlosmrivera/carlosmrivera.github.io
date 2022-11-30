const movies = JSON.parse(localStorage.getItem('movies')) ?? []

const addMovie = (movie, rating) => {
    console.log({
        movies
    })
    if(movies.some(m => m.movie.toLowerCase() === movie.toLowerCase()))
    {
        throw new Error('This movie already exists')
    }

    movies.push({
        movie,
        rating
    })

    saveMovies()
}

const saveMovies = () => {
    localStorage.setItem('movies', JSON.stringify(movies))
}

$(document).ready(function() {
    const moviesContainer = $('.movies')

    movies.forEach(movie => {
        moviesContainer.append($('<p>').text(`The movie is ${movie.movie} and is rated ${movie.rating} out of a 10.`))
    })
})