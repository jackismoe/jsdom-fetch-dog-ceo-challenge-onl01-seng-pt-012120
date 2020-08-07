let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  getImages();
  getBreeds();
});

function getImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res => res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(url) {
  let container = document.querySelector("#dog-image-container");
  let newImageElement = document.createElement("img");
  newImageElement.src = url;
  container.appendChild(newImageElement);
}

function getBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {
      breeds = Object.keys(results.message);
      updateBreeds(breeds);
      addBreedListener();
    });
}

function updateBreeds(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreedsStartingWith(letter) {
  updateBreeds(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function(even) {
    selectBreedsStartingWith(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector("#dog-breeds");
  let li = document.createElement("li");
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);  
}

function updateColor(event) {
  event.target.style.color = 'palevioletred';
}