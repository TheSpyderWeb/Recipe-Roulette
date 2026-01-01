// ------------------- DOM ELEMENTS -------------------
export const mealsEl = document.getElementById("meals");
export const favoriteContainer = document.getElementById("fav-meals");
export const mealPopup = document.getElementById("meal-popup");
export const mealInfoEl = document.getElementById("meal-info");
export const popupCloseBtn = document.getElementById("close-popup");

export const searchTerm = document.getElementById("search-term");
export const searchBtn = document.getElementById("search");

// ------------------- MEALDB API -------------------
export async function getRandomMeal() {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}

export async function getMealById(id) {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
  const respData = await resp.json();
  return respData.meals[0];
}

export async function getMealsBySearch(term) {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
  const respData = await resp.json();
  return respData.meals;
}

// ------------------- LOCAL STORAGE FAVORITES -------------------
export function addMealLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

export function removeMealLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem("mealIds", JSON.stringify(mealIds.filter(id => id !== mealId)));
}

export function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

// ------------------- ADD MEALS -------------------
export function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">Random</span>` : ""}
      <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn"><i class="fas fa-heart"></i> Favorite</button>
    </div>
  `;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", e => {
    e.stopPropagation();
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
  });

  meal.addEventListener("click", () => showMealInfo(mealData));
  mealsEl.appendChild(meal);
}

// ------------------- FAVORITES -------------------
export async function fetchFavMeals() {
  favoriteContainer.innerHTML = "";
  const mealIds = getMealsLS();

  for (let mealId of mealIds) {
    const meal = await getMealById(mealId);
    addMealFav(meal);
  }
}

export function addMealFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <span>${mealData.strMeal}</span>
    <button class="clear">Remove</button>
  `;

  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.addEventListener("click", () => showMealInfo(mealData));
  favoriteContainer.appendChild(favMeal);
}

// ------------------- POPUP -------------------
export function showMealInfo(mealData) {
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      ingredients.push(`${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`);
    } else break;
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <p>${mealData.strInstructions}</p>
    <h3>Ingredients:</h3>
    <ul>${ingredients.map(ing => `<li>${ing}</li>`).join("")}</ul>
  `;
  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove("hidden");
  mealPopup.classList.add("show");
}

// Close popup
popupCloseBtn.addEventListener("click", () => mealPopup.classList.add("hidden"));

// Search button
searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const meals = await getMealsBySearch(searchTerm.value);
  if (meals) meals.forEach(meal => addMeal(meal));
});
