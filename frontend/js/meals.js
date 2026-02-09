// ----------------- RESET FAVORITES FOR NEW USER -----------------
// Clears favorites whenever a new user/session loads the app
localStorage.removeItem("mealIds");

// ----------------- MEAL SEARCH & FAVORITES -----------------
const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

// Load initial content
getRandomMeal();
fetchFavMeals();

// ----------------- FETCH RANDOM MEAL -----------------
async function getRandomMeal() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  addMeal(data.meals[0], true);
}

// ----------------- SEARCH MEALS -----------------
async function getMealsBySearch(term) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const data = await res.json();
  return data.meals;
}

// ----------------- DISPLAY MEAL -----------------
function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random"></span>` : ""}
      <img src="${mealData.strMealThumb}">
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn">Favorite</button>
    </div>
  `;

  const btn = meal.querySelector(".fav-btn");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMealLS(mealData.idMeal);
    fetchFavMeals();
  });

  meal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  mealsEl.appendChild(meal);
}

// ----------------- LOCAL STORAGE -----------------
function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

function toggleMealLS(mealId) {
  const mealIds = getMealsLS();

  if (mealIds.includes(mealId)) {
    localStorage.setItem(
      "mealIds",
      JSON.stringify(mealIds.filter(id => id !== mealId))
    );
  } else {
    localStorage.setItem(
      "mealIds",
      JSON.stringify([...mealIds, mealId])
    );
  }
}

// ----------------- FAVORITES -----------------
async function fetchFavMeals() {
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await res.json();

    addMealFav(data.meals[0]);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}">
    <span>${mealData.strMeal}</span>
    <button>X</button>
  `;

  const btn = favMeal.querySelector("button");

  btn.addEventListener("click", () => {
    toggleMealLS(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

// ----------------- POPUP -----------------
function showMealInfo(mealData) {
  mealInfoEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}">
    <p>${mealData.strInstructions}</p>
  `;

  mealPopup.classList.remove("hidden");
}

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});

// ----------------- SEARCH BUTTON -----------------
searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";

  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach(meal => addMeal(meal));
  }
});
