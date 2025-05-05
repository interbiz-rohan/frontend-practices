// Function to add new conversion to history
function addHistory(inputData, outputData) {
    // Get existing history from localStorage
    let history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    
    // Create new history entry
    const newEntry = {
        input: {
            currency: inputData.currency,
            amount: inputData.input,
            name: inputData.name
        },
        output: {
            currency: outputData.currency,
            amount: outputData.input,
            name: outputData.name
        },
        timestamp: new Date().toISOString()
    };
    
    if(newEntry.input.amount>0)
        // Add new entry to beginning of array
        history.unshift(newEntry);
        
    // Keep only last 10 entries
    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    // Save back to localStorage
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    
    // Update the display
    updateHistoryCard();
}

// Function to update history cards display
function updateHistoryCard() {
    const historyContainer = document.getElementById('history-parent');
    const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    
    // Clear existing cards
    historyContainer.innerHTML = '';
    
    // Create new cards for each history entry
    history.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'history-card';
        
        card.innerHTML = `
            <div class="history-card-content">
                <div class="currency-from">
                    <div class="currency-symbol">${entry.input.currency}</div>
                    <div class="currency-amount">${parseFloat(entry.input.amount).toFixed(2)}</div>
                </div>
                <div class="arrow">→</div>
                <div class="currency-to">
                    <div class="currency-symbol">${entry.output.currency}</div>
                    <div class="currency-amount">${parseFloat(entry.output.amount).toFixed(2)}</div>
                </div>
            </div>
        `;
        
        historyContainer.appendChild(card);
    });
}

function clearHistory(){
    localStorage.removeItem('conversionHistory');
    updateHistoryCard();
}

// Initialize history display when page loads
document.addEventListener('DOMContentLoaded', updateHistoryCard);
