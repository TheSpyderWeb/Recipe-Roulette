// ----------------- MEAL SEARCH & FAVORITES -----------------
const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

// ----------------- DATA STRUCTURE: HASH MAP CACHE -----------------
// In-memory cache for favorite meals
// Key: meal ID, Value: meal object
// Enables O(1) lookup and avoids repeated API calls
const favoriteMealsMap = new Map();

if (mealsEl) {
  getRandomMeal();
  fetchFavMeals();
}

// Fetch random meal
async function getRandomMeal() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  addMeal(data.meals[0], true);
}

// Search meals by term
async function getMealsBySearch(term) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const data = await res.json();
  return data.meals;
}

// Display meal card
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

  meal.querySelector(".fav-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMealLS(mealData.idMeal);
    fetchFavMeals();
  });

  meal.addEventListener("click", () => showMealInfo(mealData));
  mealsEl.appendChild(meal);
}

// ----------------- LOCAL STORAGE -----------------

function toggleMealLS(id) {
  const ids = getMealsLS();
  ids.includes(id)
    ? localStorage.setItem(
        "mealIds",
        JSON.stringify(ids.filter(i => i !== id))
      )
    : localStorage.setItem(
        "mealIds",
        JSON.stringify([...ids, id])
      );
}

function getMealsLS() {
  return JSON.parse(localStorage.getItem("mealIds")) || [];
}

// ----------------- FAVORITES (DSA ENHANCED) -----------------

async function fetchFavMeals() {
  favoriteContainer.innerHTML = "";
  favoriteMealsMap.clear(); // reset Map cache before rebuilding

  for (const id of getMealsLS()) {

    // O(1) lookup using Map instead of looping through arrays
    if (favoriteMealsMap.has(id)) {
      addMealFav(favoriteMealsMap.get(id));
      continue;
    }

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    const meal = data.meals[0];

    // Cache the meal in the Map for fast future access
    favoriteMealsMap.set(id, meal);
    addMealFav(meal);
  }
}

// Create favorite meal element
function addMealFav(meal) {
  const li = document.createElement("li");
  li.innerHTML = `
    <img src="${meal.strMealThumb}">
    <span>${meal.strMeal}</span>
    <button>Remove</button>
  `;

  li.querySelector("button").onclick = () => {
    toggleMealLS(meal.idMeal);
    fetchFavMeals();
  };

  li.onclick = () => showMealInfo(meal);
  favoriteContainer.appendChild(li);
}

// ----------------- POPUP -----------------

function showMealInfo(meal) {
  mealInfoEl.innerHTML = `
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}">
    <p>${meal.strInstructions}</p>
  `;
  mealPopup.classList.remove("hidden");
}

popupCloseBtn.onclick = () => mealPopup.classList.add("hidden");

// ----------------- SEARCH -----------------

searchBtn.onclick = async () => {
  mealsEl.innerHTML = "";
  const meals = await getMealsBySearch(searchTerm.value);
  if (meals) meals.forEach(m => addMeal(m));
};
