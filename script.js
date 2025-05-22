
//    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
const searchInp = document.querySelector(".inputsection")
const searchBtn = document.querySelector(".buttonsection")
const recipeViewSection = document.querySelector("#recipeViewSection")
const meal = "mushroom"
const recipeUrl = 'https://api.api-ninjas.com/v1/recipe?query='
const apikey = "0THc+sr6O1tHPyQ1q+dZLw==kka6LaEg9zwCRnjD"
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
            const instructionsArr = instructions.split(", ")
            return {title, servings, ingredientsArr, instructions}
        })
        console.log(recipesArr)
        return writeRecipeBook(recipesArr,recipeViewSection);
    }
    catch(err){
        console.error(err)
    }
    
}

const writeRecipeBook = (arr,section)=>{
    section.innerHTML = arr.map(obj=>`
        <div class=" recipe-card flex">
            <div class="recipe-title heading text-xl">${obj.title}</div>
            <div class="recipe-ingredients">
                <div class="heading">Ingredients ( ~${obj.servings} )</div>
                <ul>${obj.ingredientsArr.map(ingredient=>`<li>${ingredient}</li>`).join("")}</ul>
            </div>
            <div class="recipe-instructions">
                <div class="heading">Instructions</div>
                    <div class="instructions overflow-y-scroll">${obj.instructions}</div>
                </div>
            <div id="saveRecipeBtn" class="btn"> </div>
        </div>
        `).join("")
    }
    const readRecipe = (section)=>{
        
    }
searchBtn.addEventListener("click",()=>{
    fetchRecipes(searchInp.value,recipeUrl,true,apikey)
})