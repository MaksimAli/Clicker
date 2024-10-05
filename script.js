const clickerEl = document.querySelector(".playarea__clicker");
const counterEl = document.querySelector(".counter__current");
const powerup1 = document.querySelector("#powerup1");
let counter = +localStorage.getItem("score");
counterEl.innerHTML = counter
let clickValue = 1; 
clickerEl.addEventListener("click", () => {
    counter += clickValue
    counterEl.innerHTML = counter
})

powerup1.addEventListener("click", () => {
    clickValue += 1
})

setInterval(() => {
localStorage.setItem("score", counter)
}, 1000)