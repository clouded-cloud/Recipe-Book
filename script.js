
const searchInp = document.querySelector(".search");
const searchBtn = document.querySelector("#searchBtn");
const recipeViewSection = document.querySelector("#recipeViewSection");

const apikey = "a7909aaf59a84f37aabdca917f8e85a2";
const baseUrl = "https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=1&apiKey=a7909aaf59a84f37aabdca917f8e85a2";
";

const fetchRecipes = async (inp) => {
  if (!inp) {
    return alert("Add an input");
  }

  const apiUrl = `${baseUrl}?query=${encodeURIComponent(inp)}&number=10&addRecipeInformation=true&apiKey=${apikey}`;

  try {
    const res = await fetch(apiUrl); // ✅ Fixed this line
    const data = await res.json();

    const recipesArr = data.results.map(recipe => {
      const { title, extendedIngredients, servings, instructions, image } = recipe;
      const ingredientsArr = extendedIngredients.map(ing => ing.original);
      return { title, servings, ingredientsArr, instructions, image };
    });

    writeRecipeBook(recipesArr, recipeViewSection);
  } catch (err) {
    console.error(err);
    alert("Something went wrong while fetching recipes.");
  }
};

const writeRecipeBook = (recipes, container) => {
  container.innerHTML = "";
  recipes.forEach(({ title, servings, ingredientsArr, instructions, image }) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h3>${title}</h3>
      <img src="${image}" alt="${title}" />
      <p><strong>Servings:</strong> ${servings}</p>
      <h4>Ingredients:</h4>
      <ul>${ingredientsArr.map(i => `<li>${i}</li>`).join("")}</ul>
      <p><strong>Instructions:</strong> ${instructions || "No instructions provided."}</p>
    `;
    container.appendChild(recipeCard);
  });
};

searchBtn.addEventListener("click", () => {
  const inputValue = searchInp.value.trim();
  fetchRecipes(inputValue);
});
