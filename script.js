let exchangeRates = {};

async function getExchangeRates() {
    const accessKey = '4cf3abed86f81538f9e5fa3f21ee39aa';
    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        exchangeRates = data.rates;
        document.getElementById('eur-rate').textContent = "EUR: " + exchangeRates.RUB.toFixed(2);
        document.getElementById('usd-rate').textContent = "USD: " + (exchangeRates.RUB / exchangeRates.USD).toFixed(2);
    } catch (error) {
        console.error('Ошибка получения курсов валют:', error);
    }
}

const convertCurrency = () => {
    const currency = document.querySelector('input[name="currency"]:checked').value;
    const amountInput = parseFloat(document.getElementById('amount').value);
    let result;

    if (currency === 'USD') {
        result = amountInput * (exchangeRates.RUB / exchangeRates.USD);
        document.getElementById('result').textContent = `${amountInput} USD = ${result.toFixed(2)} RUB`;
    } else {
        result = amountInput * exchangeRates.RUB;
        document.getElementById('result').textContent = `${amountInput} EUR = ${result.toFixed(2)} RUB`;
    }
}

const convertBack = () => {
    const currency = document.querySelector('input[name="currency"]:checked').value;
    const amountInput = parseFloat(document.getElementById('amount').value);
    let result;

    if (currency === 'USD') {
        result = amountInput / (exchangeRates.RUB / exchangeRates.USD);
        document.getElementById('result').textContent = `${amountInput} RUB = ${result.toFixed(2)} USD`;
    } else {
        result = amountInput / exchangeRates.RUB;
        document.getElementById('result').textContent = `${amountInput} RUB = ${result.toFixed(2)} EUR`;
    }
}

window.onload = getExchangeRates;