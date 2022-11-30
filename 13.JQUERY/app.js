// When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”
$(document).ready(() => {
    console.log(`Let’s get ready to party with jQuery!`)

    // Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).
    $('article img').addClass('image-center')

    // Remove the last paragraph in the article.
    $('article p:last').slideUp(function() {
        $(this).remove()
    })

    // Set the font size of the title to be a random pixel size from 0 to 100
    $('#title').css({
        'font-size': Math.ceil(Math.random() * 100)
    })

    // Add an item to the list; it can say whatever you want.
    $('ol').append($('<li>').text('This can say whatever I want!'))

    // Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.
    setTimeout(function () {
        $('aside').slideUp(function() {
            $(this)
            .empty()
            .append($('<p>')
            .text(`The list was silly. For that reason I removed all the content from the aside and place this text instead. It's still silly but the task is accomplished.`))
            .slideDown()
        })
    }, 1500)

    // When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.
    $('body').on('change', 'input', function() {
        const [ r, g, b ] = $('input')
        $('body').css('background-color', `rgb(${r.value}, ${g.value}, ${b.value})`)
    })

    // Add an event listener so that when you click on the image, it is removed from the DOM.
    $('img').on('click', function() {
        $(this).slideUp(function() {
            $(this).remove()
        })
    })


})