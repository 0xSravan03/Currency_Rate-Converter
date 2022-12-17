const dropList = document.querySelectorAll('.drop-list select');
gerButton = document.querySelector('form button');
fromCurrency = document.querySelector('.from select');
toCurrency = document.querySelector('.to select');
const API_KEY = 'API_KEY HERE'; // https://www.exchangerate-api.com/

// creating country list
for(let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_code) {
        let selected;

        if(i == 0) {
            selected = (currency_code == "USD" ? "selected" : "");
        } else {
            selected = (currency_code == "INR" ? "selected" : "");
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML('beforeend', optionTag);
    }

    dropList[i].addEventListener('change', (e) => {
        loadFlag(e.target);
    })
}

// Creating flags based on selection
function loadFlag(element) {
    for (code in country_code) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://flagcdn.com/64x48/${country_code[code].toLowerCase()}.png`
        }
    }
}

window.addEventListener('load', (e) => {
    getExchangeRate();
})

gerButton.addEventListener('click', (e) => { 
    e.preventDefault();
    getExchangeRate();
})

const exchangeIcon = document.querySelector('.icon');
exchangeIcon.addEventListener('click', (e) => {
    // Swapping From and To selections
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // Loading flags
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

const getExchangeRate = () => {
    const amount = document.querySelector('#amount');
    const exchangeText = document.querySelector('.exchange-rate');
    let amountVal = amount.value;

    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeText.innerText = "Getting Exchange Rate....";
    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;

    const apiData = fetch(url);
    let exchangeRate;

    apiData.then((response) => {
        return response.json();
    }).then((result) => {
        exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeText.textContent = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch((err) => {
        exchangeText.innerText = "Something Went Wrong....";
        console.error(err);
    });
}

























// const getExchangeRate = async () => {
//     const amount = document.querySelector('#amount');
//     let amountVal = amount.value;

//     if (amountVal == "" || amountVal == "0") {
//         amount.value = "1";
//         amountVal = 1;
//     }

//     let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;

//     const exchangeRate = await fetch(url);
//     const result = await exchangeRate.json();
//     console.log(result);
// }