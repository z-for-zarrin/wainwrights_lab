var wainwrightsData = "";
const wainwrightsList = document.querySelector("#wainwrights-list");

const getAllWainwrights = async () => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    wainwrightsData = await response.json();
    // console.log(wainwrightsData);
    wainwrightsData.forEach(createWainwright);
}

const createWainwright = async (wainwright) => {
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