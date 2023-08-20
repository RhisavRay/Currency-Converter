import Country_List from './countries.js';

const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

const apiKey = 082b55023331adb8e08c9201;

// Event listener for currency dropdowns (select)

[fromCur, toCur].forEach((select, i) => {
    for(let curCode in Country_List)
    {
        const selected = ( i === 0 && curCode === "USD" ) || ( i === 1 && curCode === "GBP" ) ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value
        const imgTag = select.parentElement.querySelector("img")
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`
    });
});

// Function to get exchange rate from api

async function getExchangeRate()
{
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting exchange rate...";
    try
    {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCur.value}`)
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amount * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amount.value} ${fromCur.value} = ${totalExRate} ${toCur.value}`
    }
}