/**
    Write a function called countdown that accepts a number as a parameter 
    and every 1000 milliseconds decrements the value and console.logs it. 
    Once the value is 0 it should log “DONE!” and stop.
 */
const countdown = (seconds) => {
    const interval = setInterval(() => {
        seconds--
        seconds > 0 ? console.log(seconds) : console.log('DONE!')
        seconds === 0 && clearInterval(interval)
    }, 1000)
}


countdown(5)
// OUTPUT:
// countdown.js:4 4
// countdown.js:4 3
// countdown.js:4 2
// countdown.js:4 1
// countdown.js:4 DONE!