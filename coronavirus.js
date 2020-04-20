fetch("https://api.covid19api.com/summary")
  .then(response => response.json())
  .then(result => {
    console.log("Result data:", result);

    for (field in result.Global) {
      const target = document.querySelector(`[global-fill="${field}"]`);
      if (target) {
        const value = result.Global[field];
        const number = new Intl.NumberFormat().format(value);
        target.textContent = number;
      }
    }

    for (field in result.Countries) {
      const country = result.Countries[field];
      if (country.CountryCode === "US") {
        ["TotalConfirmed", "TotalDeaths", "TotalRecovered"].forEach(key => {
          const target = document.querySelector(`[country-fill="${key}"]`);
          if (target) {
            const value = country[key];
            const number = new Intl.NumberFormat().format(value);
            target.textContent = number;
          }
        });
      }
    }
  });
