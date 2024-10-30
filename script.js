const clickerEl = document.querySelector(".playarea__clicker");
const counterEl = document.querySelector(".counter__current");
const powerupsEl = document.querySelector(".powerups")
let counter = 10000;
//let counter = +localStorage.getItem("score");
counterEl.innerHTML = counter;
let clickValue = 1;



const powerups =[
    {   
        title: "Сделать сок из яблока",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 100,
        amount: 0,
        profit: 0,
        value: 1,
        coef: 1.1,
        onclick: true,
        
    },
    {
        title: "Откусить яблоко",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 200,
        amount: 0,
        profit: 0,
        value: 2,
        coef: 1.2

    },
    {
        title: "Выкинуть яблоко",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 300,
        amount: 0,
        profit: 0,
        value: 3,
        coef: 1.3
    },
    {
        title: "Отрезать яблоко",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 400,
        amount: 0,
        profit: 0,
        value: 4,
        coef: 1.4,
        onclick: true,
    },
    {
        title: "Съесть яблоко",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 500,
        amount: 0,
        profit: 0,
        value: 5,
        coef: 1.5
    },
    {
        title: "Откусить яблоко",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 600,
        amount: 0,
        profit: 0,
        value: 6,
        coef: 1.6
    },
];

function calcPrice() {
    if (this.amount <= 1) {
        return this.initialPrice;
    } else if (this.amount > 1)
        {
            return (
                Math.round(this.initialPrice + this.initialPrice / this.coef + (this.amount - 1))
            );
        }
    
}

clickerEl.addEventListener("click", () => {
    counter += clickValue
    counterEl.innerHTML = counter
})


setInterval(() => {
    powerups.forEach(el => el.profit = el.amount * el.value)
    const persec = powerups.reduce((acc, val) => val.onclick ? acc: val.profit + acc, 0)
     counter += persec 
     counterEl.innerHTML = counter
    console.log(persec)
    localStorage.setItem("score", counter)
}, 1000)

const generatePowerUp = (powerup) => {
    return `<div class="powerup">
    <div class="powerup__title">${powerup.title}</div>
    <div class="powerup__price">${powerup.price()}</div>
    <div class="powerup__amount">${powerup.amount}</div>
    <div class="profit">
        <span class="profit__value">${powerup.profit}</span>
        <span class="profit__desc"> / s</span>
    </div>
 </div>`
};

const handleClick = (e) => {
    const clickedPowerup = e.target.closest(".powerup").querySelector(".powerup__title").innerHTML
    const selectedPowerup = powerups.find(
      (powerup) => clickedPowerup === powerup.title);
    buyPowerup(selectedPowerup)
  
  };
  
  const renderPowerups = () => {
    powerupsEl.innerHTML = powerups
      .map((powerup) => generatePowerUp(powerup))
      .join("");
    const powerupEls = Array.from(powerupsEl.children)
  
    powerupEls.forEach((element) =>
      element.addEventListener("click", handleClick));
  };
  
  renderPowerups()
  
  const buyPowerup = (powerup) => { 
    if (counter >= powerup.price()) {
    powerup.price("click", counter);
   
      powerup.amount++;
      counter -= powerup.price()
      renderPowerups()
      counterEl.innerHTML = counter;
    } else {
      alert("Not enough money")
    }
  }

renderPowerups()
