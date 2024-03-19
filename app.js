var wainwrightsData = "";

const getAllWainwrights = async () => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    wainwrightsData = await response.json();
    // console.log(wainwrightsData);
    return wainwrightsData;
}

getAllWainwrights();