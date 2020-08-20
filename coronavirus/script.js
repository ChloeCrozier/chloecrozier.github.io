// Element references
const stateSelectElement = document.querySelector("#states");

// Saved data references
const APP_DATA = { states: null, global: null };

// Fetch data
fetch("https://api.covid19api.com/live/country/united-states")
  .then((response) => response.json())
  .then((result) => {
    APP_DATA.states = result;
    const stateNames = Array.from(
      new Set(result.map((entry) => entry.Province))
    ).sort();

    stateSelectElement.innerHTML += stateNames
      .map((state) => `<option value="${state}">${state}</option>`)
      .join("");

    stateSelectElement.addEventListener("change", (event) => {
      const selectedState = event.target.value;
      const stateData = APP_DATA.states.find(
        (entry) => entry.Province === selectedState
      );
      console.log(selectedState);

      for (field in stateData) {
        const target = document.querySelector(`[data-fill="States_${field}"]`);
        if (target) {
          const value = stateData[field];
          const number = new Intl.NumberFormat().format(value);
          if (number === "0" && field === "Recovered") {
            target.textContent = "N/A";
          } else {
            target.textContent = number;
          }
        }
      }
    });
  });

fetch("https://api.covid19api.com/summary")
  .then((response) => response.json())
  .then((result) => {
    APP_DATA.global = result;

    for (field in result.Global) {
      const target = document.querySelector(`[data-fill="Global_${field}"]`);
      if (target) {
        const value = result.Global[field];
        const number = new Intl.NumberFormat().format(value);
        target.textContent = number;
      }
    }

    const unitedStates = result.Countries.find(
      (country) => country.CountryCode === "US"
    );

    ["TotalConfirmed", "TotalDeaths", "TotalRecovered"].forEach((key) => {
      const target = document.querySelector(`[data-fill="US_${key}"]`);
      if (target) {
        const value = unitedStates[key];
        const number = new Intl.NumberFormat().format(value);
        target.textContent = number;
      }
    });
  });

// Add loader for each table data element
const tableDataElements = document.querySelectorAll(`[data-fill]`);
Array.from(tableDataElements).forEach((element) => {
  element.innerHTML = `<div class="loader">
    <div class="circleA"></div>
    <div class="circleB"></div>
    <div class="circleC"></div>
 </div>`;
});
