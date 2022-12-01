const movies = JSON.parse(localStorage.getItem('movies')) ?? []
const $form = $('#form')
const $head = $('table thead')
const $body = $('table tbody')


const addMovie = (movie, rating) => {
    if (movies.some(m => m.movie.toLowerCase() === movie.toLowerCase())) {
        throw new Error('This movie already exists')
    }

    movies.push({
        movie,
        rating
    })

    addMovieRow(movie, rating)
    saveMovies()
}

const saveMovies = () => {
    localStorage.setItem('movies', JSON.stringify(movies))
}

const validateForm = () => {
    const [m, r] = $('input').get()
    const { value: movie } = m
    const rating = parseFloat(r.value)

    if (movie.length < 2) {
        throw new Error('Movies name must contain at least 2 characters')
    }

    if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
        throw new Error('Movies rating must be between 0 and 10')
    }

    return {
        movie,
        rating: rating
    }
}

const addMovieRow = (movie, rating) => {

    const $body = $('table tbody')
    const $row = $('<tr>')
        .append(
            $('<td>').text(movie)
        )
        .append(
            $('<td>').text(`${rating}/10`)
        )
        .append(
            $('<td>')
                .append(
                    $('<button>')
                        .text('remove')
                        .addClass('delete')
                        .attr('movie', movie)
                )
        )

    $body.append($row)

}

const updateMovies = () => {
    const $body = $('table tbody')

    $body.empty()
    movies.forEach(({ movie, rating }) => {
        addMovieRow(movie, rating)
    })

    saveMovies()
}

const sortMoviesBy = {
    name: (order = 'asc') => {
        movies.sort(({ movie : movieA }, { movie: movieB }) => {
    
    
            if (movieA < movieB) {
                return -1;
            }
    
            if (movieB > movieA) {
                return 1;
            }
    
            return 0;
        })
    
        if(order == 'desc') {
            movies.reverse()
        }
    
        updateMovies()
    },
    rating: (order = 'asc') => {
        movies.sort(({rating: a}, {rating: b}) => a - b)
    
        if(order == 'desc') {
            movies.reverse()
        }
    
        updateMovies()
    }
}

$(document).ready(function () {

    $head.on('click', 'th', function(e) {
        const orderBy = $(this).data('order-by')
        const order = $(this).data('order')

        if(orderBy !== undefined) {
            const newOrder = (order === '' || order == 'desc') ? 'asc' : 'desc'
            $(this).data('order', newOrder)
            sortMoviesBy[orderBy](newOrder)
        }
    })

    $body.on('click', 'button.delete', function (e) {
        e.preventDefault()
        const movie = $(this).attr('movie')

        movies.splice(
            movies.findIndex(m => m.movie === movie),
            1
        )

        updateMovies()
    })

    updateMovies()


    $form.on('submit', function (e) {
        e.preventDefault()
        try {
            const { movie, rating } = validateForm()
            addMovie(movie, rating)
            $('input').val('')
        } catch (error) {
            alert(error)
        }
    })
})