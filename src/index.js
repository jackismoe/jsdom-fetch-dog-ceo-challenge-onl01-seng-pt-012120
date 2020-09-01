console.log("%cHello there.", "color: firebrick")

let breeds = []


document.addEventListener("DOMContentLoaded", () => {
  getImages()
  getBreeds()
})

const getImages = () => {
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'

  fetch(imgUrl)
    .then(response => response.json())
    .then(jsonResponse => {
      jsonResponse.message.forEach(image => renderImages(image))
    })
}

const renderImages = (picUrl) => {
  let container = document.getElementById('dog-image-container')
  let newImage = document.createElement('img')
  newImage.src = picUrl
  container.appendChild(newImage)
}

const getBreeds = () => {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  fetch(breedUrl)
    .then(response => response.json())
    .then(jsonResponse => {
      breeds = Object.keys(jsonResponse.message)
      updateList(breeds)
      addBreedSelectListener()
    })
}

const updateList = (breeds) => {
  let ul = document.getElementById('dog-breeds')
  removeChildren(ul)
  breeds.forEach(breed => addBreed(breed))
}

const addBreedSelectListener = () => {
  let breedDropdown = document.getElementById('breed-dropdown')
  breedDropdown.addEventListener('change', () => {
    selectBreedsStartingWith(event.target.value)
  })
}

const removeChildren = (element) => {
  let child = element.lastElementChild
  while (child) {
    element.removeChild(child)
    child = element.lastElementChild
  }
}

const addBreed = (breed) => {
  let ul = document.getElementById('dog-breeds')
  let li = document.createElement('li')
  li.innerText = breed
  li.style.cursor = 'pointer'
  ul.appendChild(li)
  li.addEventListener('click', updateColor)
}

const selectBreedsStartingWith = (letter) => {
  updateList(breeds.filter(breed => breed.startsWith(letter)))
}

const updateColor = () => {
  event.target.style.color = 'red'
}