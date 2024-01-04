let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const toyCollection = document.getElementById('toy-collection')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitBtn = document.querySelector(".add-toy-form")
  const inputBars = document.getElementsByClassName("input-text")
  const inputName =inputBars[0]
  const inputImg = inputBars[1]
  let toyCounter = 0


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    //this line adds toggle logic
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    }
    else {
      toyFormContainer.style.display = "none";
    }
  });

  submitBtn.addEventListener('submit',function(events){
    events.preventDefault()
    toyCounter = toyCounter + 1
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        "name": inputName.value,
        "image": inputImg.value,
        "likes": 0
      })
    })
    const toyCard = document.createElement('div')
    const imgElem = document.createElement('img')
    const nameElem = document.createElement('h2')
    const likeElem = document.createElement('p')
    const buttonElem = document.createElement('button')

    toyCard.classList.add('card')
    buttonElem.classList.add('like-btn')
    imgElem.classList.add('toy-avatar')


    buttonElem.innerHTML = 'like ❤️'
    imgElem.src = inputImg.value
    nameElem.innerHTML = inputName.value
    likeElem.textContent = 0
    buttonElem.id = toyCounter
    toyCard.id = toyCounter

    buttonElem.addEventListener('click', function () {
      let currentLikes = parseInt(likeElem.textContent) + 1
      likeElem.textContent = parseInt(likeElem.textContent) + 1
      fetch(`http://localhost:3000/toys/${buttonElem.id}`, {
        method: "PATCH",

        body: JSON.stringify({
          "likes": currentLikes
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }

      })
    })

    toyCard.appendChild(nameElem)
    toyCard.appendChild(imgElem)
    toyCard.appendChild(likeElem)
    toyCard.appendChild(buttonElem)
    toyCollection.appendChild(toyCard)

    inputName.value = ""
    inputImg.value = ""

  })


  fetch('http://localhost:3000/toys')
    .then(resp =>{
      if(resp.ok)
      {
        return resp.json()
      }
      throw new Error('NETWORK RESPONSE FAILURE #1 ') 
    })
    .then(result =>{

      result.forEach(function(elem){
        
        const toyCard = document.createElement('div')
        const nameElem = document.createElement('h2')
        const imgElem = document.createElement('img')
        const likeElem = document.createElement('p')
        const buttonElem = document.createElement('button')

        


        nameElem.textContent = elem.name
        imgElem.src =  elem.image
        buttonElem.id = elem.id
        toyCard.id = elem.id
        likeElem.textContent = elem.likes
        buttonElem.innerHTML = 'like ❤️'

        buttonElem.addEventListener('click', function () {
          let currentLikes = parseInt(likeElem.textContent)+ 1
          likeElem.textContent = parseInt(likeElem.textContent) +1
          fetch(`http://localhost:3000/toys/${buttonElem.id}`,{
            method: "PATCH",

            body: JSON.stringify({
              "likes": currentLikes
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }

          })
        })

        imgElem.classList.add('toy-avatar')
        toyCard.classList.add('card')
        buttonElem.classList.add('like-btn')

        
        toyCard.appendChild(nameElem)
        toyCard.appendChild(imgElem)
        toyCard.appendChild(likeElem)
        toyCard.appendChild(buttonElem)
        toyCollection.appendChild(toyCard)
        toyCounter = toyCounter +1
      })

    })

});
