function getHistoryData(){
    let jsonList = window.localStorage.getItem("currency-history");
    jsonList ? jsonList = JSON.parse(jsonList) : jsonList = []
    return jsonList;
}

function addHistory(input, output) {
    let jsonList=getHistoryData()
    jsonList.push([input, output])
    window.localStorage.setItem("currency-history", JSON.stringify(jsonList))
    updateHistory();
}

function updateHistory() {
    let jsonList=getHistoryData()

    let parentElement = document.getElementById("histories");
    parentElement.innerHTML='';
    for (var i = 0; i < jsonList.length; i++) {
        const inputValue = jsonList[i][0];
        const outputValue = jsonList[i][1];
        let element = document.createElement("div")
        element.className = "history-card"
        element.innerHTML = `
                        <div class="card-element">
                            <div class="currency-symbol">${inputValue.symbol}</div>
                            <div class="currency-amount">${inputValue.amount}</div>
                        </div>
                        <span class="splitter">-</span>
                        <div class="card-element">
                           <div class="currency-symbol">${outputValue.symbol}</div>
                            <div class="currency-amount">${outputValue.amount}</div>
                        </div>
     `
        parentElement.appendChild(element);
    }
}