//https://www.themealdb.com/api/json/v1/1/filter.php?i=

let foodInfo = document.querySelector(".food-info");
let error = document.querySelector(".error");

const getFood = async mainIngredient => {
    let html = "<div id='loader'></div>";
    foodInfo.innerHTML = html;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`);

    const data = await response.json();
    foodInfo.innerHTML = "";

    if(data.meals === null){
        error.textContent = `No meals found with ${mainIngredient}`;
    }
    else{
        data.meals.forEach(element => {
            let html = 
            `<figure>
            <img src="${element.strMealThumb}" alt="${element.strMeal}-image">
            <figcaption>${element.strMeal}</figcaption>
            </figure>`

            foodInfo.insertAdjacentHTML("afterbegin", html);
            let figure = document.querySelector("figure");
            figure.addEventListener("click", () => {
                displayDetails("https://www.themealdb.com/api/json/v1/1/lookup.php?i=", element.idMeal);
            });
        });
        error.textContent = "";
    } 
}

let response;
const displayDetails = async (api, id = "") => {
    response = api.includes("random") ? await fetch(api) : await fetch(`${api}${id}`);
    console.log(response);
    const data = await response.json();
    let ingredients = "";
    let foodArr = [];
    let measureArr = [];
    for (const elem in data.meals[0]) {
        for(let i = 0; i <= 20; i++){
            if(elem === `strMeasure${[i]}` && data.meals[0][elem]){
                measureArr.push(data.meals[0][elem]);
            }
            if(elem === `strIngredient${[i]}` && data.meals[0][elem]){    
                foodArr.push(data.meals[0][elem]);
            }
        }
    }
    foodArr.forEach((food, index) => {
        const measure = measureArr[index];
        if(food && measure){
            ingredients += `<p>${measure} - ${food}</p>`
        }
    });

    let html = `
    <h2 style="color:#D36135; font-weight:bold">${data.meals[0].strMeal}</h2>
    </br>
    <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}-image">
    <h2>Category: ${data.meals[0].strCategory} 
    <br/>
    <br/>
    Dish Type: ${data.meals[0].strArea} 
    </h2>
    <p class="instructions">
    ${data.meals[0].strInstructions}
    </p>
    <h2>Ingredients</h2>
    <br/>
    <br/>
    <div class="ingredients">
    ${ingredients}
    </div>
    `
    document.querySelector(".content").innerHTML = html;

    document.querySelector(".content").scrollIntoView(true);
};


document.querySelector("#search-btn").addEventListener("click", () =>{
    let food = document.querySelector(".food-search");
    getFood(food.value);
});

document.querySelector("#random-btn").addEventListener("click", () => {
    displayDetails("https://www.themealdb.com/api/json/v1/1/random.php");
});

