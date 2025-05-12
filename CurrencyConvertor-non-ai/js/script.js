let fromCountry="USD";
let toCountry="INR";
let amount=0;

function initialize(){
    intializeDropdown("from-select")
    intializeDropdown("to-select")
}

function swapCurrencies() {
    // Swap the selected currencies
    const temp = fromCountry;
    fromCountry = toCountry;
    toCountry = temp;

    // Update the UI
    const fromSelect = document.getElementById("from-select").getElementsByClassName("selected-item")[0];
    const toSelect = document.getElementById("to-select").getElementsByClassName("selected-item")[0];
    const tempHTML = fromSelect.innerHTML;
    fromSelect.innerHTML = toSelect.innerHTML;
    toSelect.innerHTML = tempHTML;

    // Swap the input values if they exist
    const fromInput = document.getElementById("from-input");
    const toInput = document.getElementById("to-input");
    if (fromInput.value && toInput.value) {
        const tempValue = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = tempValue;
        amount = fromInput.value;
        fetchCurrency();
    }
}

initialize()
AddInputEvents()
updateHistory()