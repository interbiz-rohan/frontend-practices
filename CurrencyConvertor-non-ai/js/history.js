function getHistoryData(){
    let jsonList = window.localStorage.getItem("conversionHistory");
    jsonList ? jsonList = JSON.parse(jsonList) : jsonList = []
    return jsonList;
}

function addHistory(input, output) {
    let jsonList = getHistoryData();
    const timestamp = new Date().toLocaleString();
    jsonList.push({
        input,
        output,
        timestamp
    });
    window.localStorage.setItem("conversionHistory", JSON.stringify(jsonList));
    updateHistory();
}

function updateHistory() {
    let jsonList = getHistoryData();
    
    let parentElement = document.getElementById("histories");
    parentElement.innerHTML = jsonList.length > 0 ? '' : '<p style="text-align: center;">No history found</p>';
    
    for (var i = 0; i < jsonList.length; i++) {
        const { input, output, timestamp } = jsonList[i];
        let element = document.createElement("div");
        element.className = "history-card";
        element.innerHTML = `
            <div class="card-content">
                <div class="card-element">
                    <div class="currency-symbol">${input?.symbol}</div>
                    <div class="currency-amount">${input?.amount}</div>
                </div>
                <span class="splitter">→</span>
                <div class="card-element">
                    <div class="currency-symbol">${output?.symbol}</div>
                    <div class="currency-amount">${output?.amount}</div>
                </div>
            </div>
            <div class="card-timestamp">${timestamp}</div>
        `;
        parentElement.appendChild(element);
    }
}

function clearHistory(){
    window.localStorage.removeItem("conversionHistory");
    updateHistory();
}

function toggleHistory() {
    const historyContent = document.querySelector('.history-content');
    const collapseIcon = document.querySelector('.collapse-icon');
    historyContent.classList.toggle('collapsed');
    collapseIcon.classList.toggle('collapsed');
}
