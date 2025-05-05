// Dummy currency list
const currencies = [
    { value: 'USD', label: 'USD - US Dollar', flag: 'https://flagcdn.com/48x36/us.png', symbol: '$' },
    { value: 'INR', label: 'INR - Indian Rupee', flag: 'https://flagcdn.com/48x36/in.png', symbol: '₹' },
    { value: 'EUR', label: 'EUR - Euro', flag: 'https://flagcdn.com/48x36/eu.png', symbol: '€' },
    { value: 'GBP', label: 'GBP - British Pound', flag: 'https://flagcdn.com/48x36/gb.png', symbol: '£' },
    { value: 'JPY', label: 'JPY - Japanese Yen', flag: 'https://flagcdn.com/48x36/jp.png', symbol: '¥' },
    { value: 'AUD', label: 'AUD - Australian Dollar', flag: 'https://flagcdn.com/48x36/au.png', symbol: 'A$' },
    { value: 'CAD', label: 'CAD - Canadian Dollar', flag: 'https://flagcdn.com/48x36/ca.png', symbol: 'C$' },
    { value: 'CHF', label: 'CHF - Swiss Franc', flag: 'https://flagcdn.com/48x36/ch.png', symbol: 'Fr' },
    { value: 'CNY', label: 'CNY - Chinese Yuan', flag: 'https://flagcdn.com/48x36/cn.png', symbol: '¥' },
    { value: 'HKD', label: 'HKD - Hong Kong Dollar', flag: 'https://flagcdn.com/48x36/hk.png', symbol: 'HK$' },
    { value: 'NZD', label: 'NZD - New Zealand Dollar', flag: 'https://flagcdn.com/48x36/nz.png', symbol: 'NZ$' },
    { value: 'SGD', label: 'SGD - Singapore Dollar', flag: 'https://flagcdn.com/48x36/sg.png', symbol: 'S$' },
    { value: 'KRW', label: 'KRW - South Korean Won', flag: 'https://flagcdn.com/48x36/kr.png', symbol: '₩' },
    { value: 'SEK', label: 'SEK - Swedish Krona', flag: 'https://flagcdn.com/48x36/se.png', symbol: 'kr' },
    { value: 'NOK', label: 'NOK - Norwegian Krone', flag: 'https://flagcdn.com/48x36/no.png', symbol: 'kr' },
    { value: 'DKK', label: 'DKK - Danish Krone', flag: 'https://flagcdn.com/48x36/dk.png', symbol: 'kr' },
    { value: 'RUB', label: 'RUB - Russian Ruble', flag: 'https://flagcdn.com/48x36/ru.png', symbol: '₽' },
    { value: 'BRL', label: 'BRL - Brazilian Real', flag: 'https://flagcdn.com/48x36/br.png', symbol: 'R$' },
    { value: 'ZAR', label: 'ZAR - South African Rand', flag: 'https://flagcdn.com/48x36/za.png', symbol: 'R' },
    { value: 'MXN', label: 'MXN - Mexican Peso', flag: 'https://flagcdn.com/48x36/mx.png', symbol: '$' },
    { value: 'IDR', label: 'IDR - Indonesian Rupiah', flag: 'https://flagcdn.com/48x36/id.png', symbol: 'Rp' },
    { value: 'MYR', label: 'MYR - Malaysian Ringgit', flag: 'https://flagcdn.com/48x36/my.png', symbol: 'RM' },
    { value: 'THB', label: 'THB - Thai Baht', flag: 'https://flagcdn.com/48x36/th.png', symbol: '฿' },
    { value: 'TRY', label: 'TRY - Turkish Lira', flag: 'https://flagcdn.com/48x36/tr.png', symbol: '₺' },
    { value: 'AED', label: 'AED - UAE Dirham', flag: 'https://flagcdn.com/48x36/ae.png', symbol: 'د.إ' },
    { value: 'SAR', label: 'SAR - Saudi Riyal', flag: 'https://flagcdn.com/48x36/sa.png', symbol: '﷼' },
    { value: 'PLN', label: 'PLN - Polish Złoty', flag: 'https://flagcdn.com/48x36/pl.png', symbol: 'zł' },
    { value: 'CZK', label: 'CZK - Czech Koruna', flag: 'https://flagcdn.com/48x36/cz.png', symbol: 'Kč' },
    { value: 'HUF', label: 'HUF - Hungarian Forint', flag: 'https://flagcdn.com/48x36/hu.png', symbol: 'Ft' },
    { value: 'ILS', label: 'ILS - Israeli Shekel', flag: 'https://flagcdn.com/48x36/il.png', symbol: '₪' },
    { value: 'PHP', label: 'PHP - Philippine Peso', flag: 'https://flagcdn.com/48x36/ph.png', symbol: '₱' },
    { value: 'PKR', label: 'PKR - Pakistani Rupee', flag: 'https://flagcdn.com/48x36/pk.png', symbol: '₨' },
    { value: 'BGN', label: 'BGN - Bulgarian Lev', flag: 'https://flagcdn.com/48x36/bg.png', symbol: 'лв' },
    { value: 'RON', label: 'RON - Romanian Leu', flag: 'https://flagcdn.com/48x36/ro.png', symbol: 'lei' },
    { value: 'HRK', label: 'HRK - Croatian Kuna', flag: 'https://flagcdn.com/48x36/hr.png', symbol: 'kn' }
];

// Create dropdown item element
const createDropdownItem = (currency, onSelect) => {
    const item = document.createElement('div');
    item.className = 'select-item';
    item.innerHTML = `
        <img src="${currency.flag}" alt="${currency.value}" class="flag-img">
        <span>${currency.label}</span>
    `;
    item.addEventListener('click', () => onSelect(currency));
    return item;
};

// Update selected display
const updateSelectedDisplay = (selected, currency) => {
    selected.innerHTML = `
        <img src="${currency.flag}" alt="${currency.value}" class="flag-img">
        <span>${currency.label}</span>
    `;
};

// Initialize dropdown
const initializeDropdown = (containerId) => {
    const container = document.getElementById(containerId);
    const selected = container.querySelector('.select-selected');
    const items = container.querySelector('.select-items');
    let changeCallbacks = [];

    // Create and append items
    items.innerHTML = '';
    currencies.forEach(currency => {
        const item = createDropdownItem(currency, (selectedCurrency) => {
            updateSelectedDisplay(selected, selectedCurrency);
            items.classList.add('select-hide');
            // Call all registered change callbacks
            changeCallbacks.forEach(callback => callback(selectedCurrency));
        });
        items.appendChild(item);
    });

    // Toggle dropdown on click
    selected.addEventListener('click', () => {
        items.classList.toggle('select-hide');
    });

    // Return functions to interact with dropdown
    return {
        getSelected: () => selected,
        onChange: (callback) => {
            changeCallbacks.push(callback);
        }
    };
};


