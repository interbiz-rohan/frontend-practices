let timer

async function intializeDropdown(targetId) {
    const parentElement = document.getElementById(targetId);
    const dropdownElement = parentElement.getElementsByClassName("select-items")

    if (dropdownElement.length) {
        const items = Array.from(dropdownElement)[0];
        const searchInput = items.querySelector('.search-input');
        const countryList = await fetch('./js/country.json');
        const data = await countryList.json();

        const countryItems = [];
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
            countryItems.push({element: item, divider: item2});
            items.appendChild(item);
            items.appendChild(item2);
        }

        searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        searchInput.addEventListener('input', (e) => {
            e.stopPropagation();
            const searchTerm = e.target.value.toLowerCase();
            countryItems.forEach(({element, divider}) => {
                const text = element.textContent.toLowerCase();
                const matches = text.includes(searchTerm);
                element.style.display = matches ? 'flex' : 'none';
                divider.style.display = matches ? 'block' : 'none';
            });
        });

        parentElement.addEventListener("click", (e) => {
            e.stopPropagation();
            items.classList.toggle("hide-dropdown");
            if (!items.classList.contains("hide-dropdown")) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!parentElement.contains(e.target)) {
                items.classList.add("hide-dropdown");
            }
        });
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

        fetchCurrency();
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
    try {
        showLoading(true);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Credentials', 'true');

        const response = await fetch(`https://v6.exchangerate-api.com/v6/0ae478925550c310735e1012/latest/${fromCountry}`,
            {headers: headers}
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.conversion_rates || !data.conversion_rates[toCountry]) {
            throw new Error('Invalid currency conversion data received');
        }

        const calculatedValue = (data.conversion_rates[toCountry] * amount).toFixed(2);
        document.getElementById("to-input").value = calculatedValue;
        addHistory(
            {symbol: fromCountry, amount: amount},
            {symbol: toCountry, amount: calculatedValue}
        );
    } catch (error) {
        console.error('Currency conversion error:', error);
        let errorMessage = 'An error occurred while converting currencies. ';
        
        alert(errorMessage);
        document.getElementById("to-input").value = '';
    } finally {
        showLoading(false);
    }
}

function showLoading(value){
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.style.display = value ? "block":"none";
}



