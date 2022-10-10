document.addEventListener('DOMContentLoaded', () => {
    const {innerHeight, innerWidth} = window

    document.addEventListener('mousemove', e => {
        //transform coordenates
        const { pageX, pageY } = e
        const colorX = (pageX * 255) / innerWidth
        const colorY = (pageY * 255) / innerHeight

        console.log({
            pageX,
            pageY,
            colorX,
            colorY
        })

        document.body.style.backgroundColor = `RGB(${colorX}, ${colorY}, 255)`
    })
})