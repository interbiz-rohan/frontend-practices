
let fromCountry="USD";
let toCountry="INR";
let amount=0;

function initialize(){
    intializeDropdown("from-select")
    intializeDropdown("to-select")
}

initialize()
AddInputEvents()
updateHistory()