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

// handling form input
const filterForm = document.querySelector("#filter-form");

filterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const userInput = evt.target[0].value;
    console.log(userInput);
});

