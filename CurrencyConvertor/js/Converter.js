
// Cache for exchange rates
let exchangeRates = null;

// Fetch exchange rates from API
const fetchExchangeRates = async (baseCurrency = 'USD') => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        exchangeRates = data.rates;
        console.log(exchangeRates);
        return data.rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
};

// Simple conversion function
const Converter = async () => {
    // Get input and output elements
    const fromInput = document.getElementById('from-amount');
    const toInput = document.getElementById('to-amount');
 
    
    // Get selected currencies from dropdowns
    const fromSelected = document.querySelector('#from-selected img').alt;
    const toSelected = document.querySelector('#to-selected img').alt;
    
    // Find currency data from currencies array
    const fromCurrency = currencies.find(c => c.value === fromSelected);
    const toCurrency = currencies.find(c => c.value === toSelected);
    
    if(fromInput.value==0){
        return;
    }
    
    // Fetch rates if needed
    await fetchExchangeRates(fromCurrency.value);
    
    
    // Calculate and update
    const rate = exchangeRates[toCurrency.value];
    const convertedAmount = (fromInput.value * rate).toFixed(2);
    toInput.value = convertedAmount;

    // Add to history
    const inputData = {
        currency: fromCurrency.symbol,
        input: fromInput.value,
        name: fromCurrency.value
    };

    const outputData = {
        currency: toCurrency.symbol,
        input: convertedAmount,
        name: toCurrency.value
    };

    // After swapping, update the graph
    const activeTimeRange = document.querySelector('.time-range-btn.active').dataset.range;
    handleTimeRangeClick(activeTimeRange);

    addHistory(inputData, outputData);
};
