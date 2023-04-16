fetch("http://localhost:3000/foods")
.then(response => response.json())
.then(foods => {
    foods.forEach(food => {
        addFoodImageToMenu(food)
    })
})

fetch("http://localhost:3000/foods/1")
.then(response => response.json())
.then(food => {
    displayFoodDetails(food)
})

function addFoodImageToMenu(food){
    const restaurantMenu = document.getElementById('restaurant-menu')
    const foodImage = document.createElement('img')
    foodImage.src = food.image
    foodImage.addEventListener('click', () => {
        displayFoodDetails(food)
    })
    restaurantMenu.appendChild(foodImage)
}

function displayFoodDetails(food){
    const foodImage = document.querySelector('.detail-image')
    foodImage.src = food.image

    const foodName = document.querySelector('.name')
    foodName.textContent = food.name

    const foodDescription = document.querySelector('#description-display')
    foodDescription.textContent = food.description
}

const newFoodForm = document.getElementById('new-food')
newFoodForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const foodNameValue = document.getElementById('new-name').value
    const foodImageValue = document.getElementById('new-image').value
    const foodDescriptionValue = document.getElementById('new-description').value

    const newFood = {
        name: foodNameValue,
        image: foodImageValue,
        description: foodDescriptionValue
    }

    // Optimistic Rendering: Frontend updates happen before the data is sent to the backend
    // addFoodImageToMenu(newFood)

    // POST
    fetch("http://localhost:3000/foods", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newFood)
    })
    .then(response => {
        // Pessimistic Rendering: Data is sent to the backend first, and we only update the frontend if the response is successful (if the value of "response.ok" is "True")
        if(response.ok){
            response.json().then(newFoodData => {
                addFoodImageToMenu(newFoodData)
            })
        }
        else{
            alert(`Error: ${response.status} ${response.statusText}`)
        }
    })
})
