const letters = document.getElementsByClassName("letter")
const btn = document.getElementById("btn")
let interval = null

const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

const startInterval = () => {
    interval = setInterval(() => {
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.color = randomColor()
        }
    }, 1000)
    
    btn.setAttribute('data-action', 'stop')
    btn.innerText = 'Stop'
}

const stopInterval = () => {
    clearInterval(interval)
    btn.setAttribute('data-action', 'start')
    btn.innerText = 'Resume'
}

const buttonWillDo = () => {
    return btn.getAttribute('data-action') //stop or start
}

btn.addEventListener("click", () => {
    buttonWillDo() === 'stop' ? stopInterval() : startInterval()
})

startInterval()