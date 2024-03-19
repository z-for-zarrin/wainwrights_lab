// GETTING ALL DATA ////

// create global variable for storing all API data
var wainwrightsData = "";

const wainwrightsList = document.querySelector("#wainwrights-list");

// function that gets all Wainwrights and assigns them to local variable
const getAllWainwrights = async () => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    wainwrightsData = await response.json();
    // console.log(wainwrightsData);
    wainwrightsData.forEach(createWainwright);
}

// function that appends data to webpage
const createWainwright = (wainwright) => {
    const newWainwrightName = document.createElement("h3")
    const newWainwrightData = document.createElement("ul");
    newWainwrightName.innerText = wainwright.name;

    const heightMetres = document.createElement("li");
    const heightFeet = document.createElement("li");
    const areaName = document.createElement("li");
    const localTowns = document.createElement("li");

    heightMetres.innerText = `Height (m): ${wainwright.heightMetres}`;
    heightFeet.innerText = `Height (ft): ${wainwright.heightFeet}`;
    areaName.innerText = `Area: ${wainwright.area.areaName}`;
    localTowns.innerText = `Local towns: ${wainwright.area.localTowns}`;
    
    const data = Array(heightMetres, heightFeet, areaName, localTowns);

    data.forEach(element => newWainwrightData.appendChild(element));

    wainwrightsList.appendChild(newWainwrightName);
    wainwrightsList.appendChild(newWainwrightData);
}

getAllWainwrights();

// FILTERING ////

const filterForm = document.querySelector("#filter-form");
const loadingMessage = document.querySelector("#loading-message");

// form submission
filterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const userInput = evt.target[0].value;
    // console.log(userInput);
    loadingMessage.innerText = "Loading results...";
    setTimeout(() => {
        loadingMessage.innerText = "";
        getFilteredWainwrights(userInput);
    }, 1000);
    
});

// creating array of filtered results
const filterWainwrights = (textInput) => {
    const textInputLower = textInput.toLowerCase();
    const filteredWainwrights = [];
    wainwrightsData.forEach(element => {
        // picking out wainwrights with matching names or area names
        nameLower = element.name.toLowerCase();
        areaLower = element.area.areaName.toLowerCase();
        if(nameLower.includes(textInputLower) ||
           areaLower.includes(textInputLower)){
            filteredWainwrights.push(element);
        }

        //picking out wainwrights with matching local towns
        for(i = 0; i < element.area.localTowns.length; i++){
            localTownLower = element.area.localTowns[i].toLowerCase();
            if (localTownLower.includes(textInputLower)) {
                filteredWainwrights.push(element);
            }
        }

    });
    return filteredWainwrights;
}

// outputting results onto page
const getFilteredWainwrights = (textInput) => {
    wainwrightsList.innerText = "";
    filterWainwrights(textInput).forEach(createWainwright);
}

// ERROR HANDLING ///

const causeProblems = () => {
    const response = fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.jsong")
    return response;
}

const problemButton = document.querySelector("#problem-button");

problemButton.addEventListener("click", () => {
    try {
        badResponse = causeProblems();
        console.log(badResponse);
        if(!badResponse.ok){
            throw new Error()               
        }
    } catch (e) {
        window.alert("why would you do this")
    }
});