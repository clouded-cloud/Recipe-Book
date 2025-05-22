
//    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
const searchInp = document.querySelector(".search")
const searchBtn = document.querySelector("#searchBtn")
const recipeViewSection = document.querySelector("#recipeViewSection")

 const apikey = "3a0c9dbd828240b885ccb5e90826ae47";
 const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";

 const fetchRecipes = async(inp,apiUrl,keyIsPresent=true,apiKey="")=>{
     if(!inp){
         return alert("Add an input")
        }
        apiUrl+=encodeURIComponent(inp)
    try{
        const res = keyIsPresent? await fetch(apiUrl,{
            method: 'GET',
            headers: { 'X-Api-Key': `${apikey}`},
            contentType: 'application/json',
        }): await fetch(apiUrl)
        const fetchArr = await res.json()
        const recipesArr = fetchArr.map(obj=>{
            const {title,ingredients,servings,instructions} = obj;
            const ingredientsArr = ingredients.split("|")
            return {title, servings, ingredientsArr, instructions}
        })
        writeRecipeBook(recipesArr,recipeViewSection);
    }
    catch(err){
        console.error(err)
    }
    
}

const writeRecipeBook = (arr,section)=>{
    section.innerHTML = arr.map(obj=>`
        <div class="recipe-card rounded-2xl">
            <div class="recipe-title heading">${obj.title}</div>
            <div class="section recipe-ingredients">
                <div class="sub-heading">Ingredients ( ~${obj.servings} )</div>
                <ul>${obj.ingredientsArr.map(ingredient=>`<li>${ingredient}</li>`).join("")}</ul>
            </div>
            <div class="section recipe-instructions">
                <div class="sub-heading">Instructions</div>
                    <div class="instructions">${obj.instructions}</div>
                </div>
            <div id="saveRecipeBtn" class="btn">Save</div>
        </div>
        `).join("")
    }
    const readRecipe = (section)=>{
        
    }
searchBtn.addEventListener("click",()=>{
    fetchRecipes(searchInp.value,recipeUrl,true,apikey)
})