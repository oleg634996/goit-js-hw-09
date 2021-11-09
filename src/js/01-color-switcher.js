const btnStart = document.querySelector('[data-start]')
const btnStop= document.querySelector('[data-stop]')

let interval = null

btnStart.addEventListener('click', () => {
    interval = setInterval(() => {
        document.body.style.background = getRandomHexColor()
    }, 1000)
    
    btnStart.disabled = true
    btnStop.disabled = false
});
  
btnStop.addEventListener('click', () => {
    clearInterval(interval)

    btnStart.disabled = false
    btnStop.disabled = true
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
};

