
let timer


async function intializeDropdown(targetId) {

    const parentElement = document.getElementById(targetId);
    const dropdownElement = parentElement.getElementsByClassName("select-items")


    if (dropdownElement.length) {

        const items = Array.from(dropdownElement)[0];
        const countryList = await fetch('./js/country.json');
        const data = await countryList.json();

        for (var i = 0; i < data.length; i++) {
            const item = document.createElement('div')
            item.className = "country-item"
            item.addEventListener("click", (event) => setSelected(event, targetId))
            item.innerHTML = `
            <img src="data:image/png;base64,${data[i].flag}"
                                alt="${data[i].currency.code}" />
            <h2 class="select-item-title"> ${data[i].currency.code} - ${data[i].name} - ${data[i].currency.name} - ${data[i].currency.symbol} </h2>
            `
            const item2 = document.createElement('hr')

            items.appendChild(item);
            items.appendChild(item2);
        }
        parentElement.addEventListener("click", () => items.classList.toggle("hide-dropdown"))
    }
}


function setSelected(event, id) {

    if (id == "from-select") {
        fromCountry = event.currentTarget.getElementsByTagName("img")?.[0].alt;
    } else {
        toCountry = event.currentTarget.getElementsByTagName("img")?.[0].alt;
    }

    document.getElementById(id).getElementsByClassName("selected-item")[0].innerHTML =
        `<div class="country-item">` +
        event.currentTarget.innerHTML +
        `</div>`
        ;
}



function AddInputEvents() {
    const inputElement = document.getElementById("from-input");
    inputElement.addEventListener("input", (event) => {
        if(event.target.value>0){
        amount = event.target.value;
        debounce(fetchCurrency, 1000);}
        else {
            clearTimeout(timer)
        }
    })
}


function debounce(callback, delay) {
    clearTimeout(timer)
    timer = setTimeout(() => {
        callback();
    }, delay)
}


async function fetchCurrency() {
    showLoading(true)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Credentials', 'true');

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/0ae478925550c310735e1012/latest/${fromCountry}`,
            {headers: headers}
        );
        const data = await response.json();
        
        
    const calculatedValue= (data.conversion_rates[toCountry] * amount).toFixed(2);
    document.getElementById("to-input").value =calculatedValue
    addHistory( {symbol:fromCountry,amount:amount},{symbol:toCountry,amount:calculatedValue});
    } catch (error) {
        window.alert("Error fetching currency data");
    }
    showLoading(false)
}


function showLoading(value){
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.style.display = value ? "block":"none";
}



