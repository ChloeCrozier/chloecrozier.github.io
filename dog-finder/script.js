//Element references
const breedSelectElement = document.querySelector("#breeds");

//Saved data references
const APP_DATA = { breeds: null };

//Fetch dog API
fetch("https://dog.ceo/api/breeds/list/all")
  .then((response) => response.json())
  .then((result) => {
    APP_DATA.breeds = result;
    var breedNames = Object.keys(result.message);

    function formatData(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    breedSelectElement.innerHTML += breedNames
      .map((breed) => `<option value="${breed}">${formatData(breed)}</option>`)
      .join("");

    breedSelectElement.addEventListener("change", (event) => {
      const selectedBreed = event.target.value;
      console.log(selectedBreed);

      fetch("https://dog.ceo/api/breeds/image/random");
      function addDogImage() {
        document.getElementById(
          "dog-image"
        ).innerHTML = `<img src='https://dog.ceo/api/breed/${selectedBreed}/images/random'>`;
      }
      addDogImage();
    });
  });
