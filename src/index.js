let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys () {
  fetch ('http://localhost:3000/toys')
  .then (res => res.json())
  .then (toys => {
    for (let toy of toys) {
      renderToys(toy)
    }
  })
}
const toyCollection = document.getElementById('toy-collection')

function renderToys (toy) {
  const cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  const cardTitle = document.createElement('h2')
  cardTitle.innerText = toy.name
  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  const toyP = document.createElement('p')
  toyP.innerText = `${toy.likes} likes`
  toyP.className = 'toyP'
  const likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.id = toy.id
  likeBtn.innerText = 'Like'
  likeBtn.addEventListener('click', event => {
    event.preventDefault();
    toy.likes++
    toyP.innerText = `${toy.likes} likes`
    clickLikeBtn(event.target, toy.likes)
  })
  cardDiv.append(cardTitle, toyImg, toyP, likeBtn)
  toyCollection.appendChild(cardDiv)
}

const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', event => {
  event.preventDefault();
  createNewToy(event.target)
  toyForm.reset()
})

function createNewToy(event) {
  fetch ('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'name': event.name.value,
      'image': event.image.value,
      'likes': 0
    })
  })
  .then(res => res.json())
  .then(newToy => {
    renderToys(newToy)
  })
}

function clickLikeBtn(event, likes) {
  let newNumberOfLikes = likes
  fetch (`http://localhost:3000/toys/${event.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': newNumberOfLikes
    })
  })
  .then(res => res.json())
  .then(newLikes => {
    console.log('newLikes', newLikes)
    newLikes = newNumberOfLikes
  })
}