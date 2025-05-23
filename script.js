const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";
const apikey = "a7909aaf59a84f37aabdca917f8e85a2";

const fetchRecipes = async (inp) => {
  if (!inp) return alert("Add an input");

  const searchUrl = `${baseUrl}?query=${encodeURIComponent(inp)}&number=5&apiKey=${apikey}`;
  console.log("Fetching:", searchUrl);

  try {
    const res = await fetch(searchUrl);
    if (!res.ok) throw new Error(`Search error: ${res.status}`);

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return alert("No recipes found.");
    }

    // Fetch detailed info for each recipe
    const recipeDetails = await Promise.all(
      data.results.map(async (recipe) => {
        const infoUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apikey}`;
        const res = await fetch(infoUrl);
        if (!res.ok) throw new Error(`Detail fetch error: ${res.status}`);
        const details = await res.json();

        const { title, extendedIngredients, servings, instructions, image } = details;
        const ingredientsArr = extendedIngredients.map((ing) => ing.original);
        return { title, servings, ingredientsArr, instructions, image };
      })
    );

    renderRecipes(recipeDetails);

  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    alert("Something went wrong while fetching recipes.");
  }
};

// Simple render function to show recipes in a container
const renderRecipes = (recipes) => {
  const container = document.getElementById("recipeContainer");
  container.innerHTML = ""; // Clear old results

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" width="200">
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>${recipe.ingredientsArr.map(ing => `<li>${ing}</li>`).join('')}</ul>
      <p><strong>Instructions:</strong></p>
      <p>${recipe.instructions || "No instructions provided."}</p>
    `;
    container.appendChild(card);
  });
};

// Example search trigger (replace with your own event listener)
document.getElementById("searchBtn").addEventListener("click", () => {
  const input = document.getElementById("recipeInput").value.trim();
  fetchRecipes(input);
});