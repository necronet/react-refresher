import React, { useEffect, useState } from "react"
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid'

export const RecipeContext = React.createContext()

const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId)

useEffect(() => {
  const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (recipeJSON != null) {
    setRecipes(JSON.parse(recipeJSON))
  }
}, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
}, [recipes])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    
    const newRecipe = {
      id: uuidv4(),
      name: '',
      cookTime: '',
      instructions: [],
      ingredients: [
      { id: uuidv4(), name:'', amount: '' }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id);

    newRecipes[index] = recipe;
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipe != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))    
  }
   
  return <RecipeContext.Provider value={recipeContextValue}> 
            <RecipeList recipes ={recipes} />;
            { selectedRecipe && <RecipeEdit recipe={selectedRecipe}/> }
          </RecipeContext.Provider>
}


const sampleRecipes = [
  { 
    id: 1, 
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45 h",
    instructions: ["Put salt on Chicken", "Chicken in Oven", "Eat it"],
    ingredients: [
      {
        id:1,
        name:"Chicken",
        amount:"2 pounds"
      },
      {
        id:2,
        name:"Salt",
        amount:"1 pinch"
      }
    ]
  },
  { 
    id: 2, 
    name: "Plain Pork",
    servings: 5,
    cookTime: "1:15 h",
    instructions: ["Put paprika on Pork", "Pork in Oven", "Eat it"],
    ingredients: [
      {
        id:1,
        name:"Pork",
        amount:"3 pounds"
      },
      {
        id:2,
        name:"Paprika",
        amount:"1 cup"
      }
    ]
  }
]

export default App;