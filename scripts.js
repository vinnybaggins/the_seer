const cardsArea = document.querySelector("#cardsArea");
const table = document.querySelector("#cardsContainer");
const guessBtn = document.querySelector("#guessBtn");
const returnBtn = document.querySelector("#returnBtn");
const resultArea = document.querySelector("#resultArea");
const result = document.querySelector("#result");

cardArray = [];

let chosenNumber = 0;

const power = 6;

for(let cardNumber = 1; cardNumber <= power; cardNumber++)
{
    const card = createCards(cardNumber);

    for(let j = 1; j <= 2**power; j+= 2**cardNumber)
    {
        for(let z = ((2**cardNumber)/2)-1; z < 2**cardNumber - 1; z++)
        {
            createCells(j+z,card);
        }
    }
}

function createCards(cardNumber)
{
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", cardClick.bind(this,card));
    card.setAttribute("id",`card${cardNumber+1}`);
    table.appendChild(card);
    cardArray.push(card);
    return card;
}

function createCells(number,card)
{
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = number;
    card.appendChild(cell);
}

function cardClick(card)
{
    if(!card.classList.contains("clicked")){
        card.classList.add("clicked");
        chosenNumber += parseInt(card.firstChild.innerText);
    }else{
        chosenNumber -= parseInt(card.firstChild.innerText);
        card.classList.remove("clicked");
    }
}

guessBtn.addEventListener(
    "click",function()
    {
        if(chosenNumber == 0) return false;
        cardsArea.classList.toggle("hide");
        result.innerText = `You chose the number ${chosenNumber}`;
        resultArea.classList.toggle("hide");

        return false;
})

returnBtn.addEventListener(
    "click",function()
    {
        cardsArea.classList.toggle("hide");
        resultArea.classList.toggle("hide");

        for(const element of cardArray){
            element.classList.remove("clicked");
        }
        chosenNumber = 0;
        return false;
})