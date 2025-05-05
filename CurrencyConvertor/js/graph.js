
// Cache for graph data
let graphData = null;
let chart = null;

// Function to fetch graph statistics
async function fetchGraphStats(fromCurrency, toCurrency, startDate, endDate) {
    try {
        const { baseUrl } = getApiConfig();
        const response = await fetch(`${baseUrl}/stats?from=${fromCurrency}&to=${toCurrency}&start_date=${startDate}&end_date=${endDate}`, {
            headers: getApiHeaders()
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching graph stats:', error);
        return null;
    }
}

// Function to update graph canvas
function updateGraphCanvas(stats) {
    const ctx = document.getElementById('comparisonGraph').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }

    if (stats && stats.stats && stats.stats.length > 0) {
        const stat = stats.stats[0];
        
        // Create chart data
        const data = {
            labels: ['High', 'Average', 'Low'],
            datasets: [{
                label: `${stats.from}/${stat.to} Rate`,
                data: [stat.high, stat.average, stat.low],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Chart configuration
        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Exchange Rate'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw.toFixed(4)} ${stat.to}`;
                            }
                        }
                    }
                }
            }
        };

        // Create new chart
        chart = new Chart(ctx, config);
    }
}

// Function to update graph display
function updateGraphDisplay(stats) {
    const currentRate = document.getElementById('current-rate-value');
    const currencyPair = document.getElementById('currency-pair');
    
    if (stats && stats.stats && stats.stats.length > 0) {
        const stat = stats.stats[0];
        
        // Update current rate
        currentRate.textContent = stat.average.toFixed(2);
        
        // Update currency pair
        currencyPair.textContent = `${stats.from}/${stat.to}`;
        
        // Update graph canvas
        updateGraphCanvas(stats);
    }
}

// Function to handle time range button clicks
function handleTimeRangeClick(range) {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (range) {
        case '1D':
            startDate.setDate(startDate.getDate() - 1);
            break;
        case '1W':
            startDate.setDate(startDate.getDate() - 7);
            break;
        case '1M':
            startDate.setMonth(startDate.getMonth() - 1);
            break;
        case '3M':
            startDate.setMonth(startDate.getMonth() - 3);
            break;
        case '1Y':
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
    }

    // Format dates for API
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    // Get selected currencies
    const fromCurrency = document.querySelector('#from-selected img').alt;
    const toCurrency = document.querySelector('#to-selected img').alt;
    
    // Fetch and update graph
    fetchGraphStats(fromCurrency, toCurrency, formattedStartDate, formattedEndDate)
        .then(stats => {
            if (stats) {
                updateGraphDisplay(stats);
            }
        });
}

// Initialize graph functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for time range buttons
    const timeRangeButtons = document.querySelectorAll('.time-range-btn');
    timeRangeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            timeRangeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Handle the time range
            handleTimeRangeClick(button.dataset.range);
        });
    });
    
    // Initial load with default time range (1W)
    handleTimeRangeClick('1W');
});
