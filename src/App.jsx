import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import MealCard from './MealCard.jsx'
import './App.css'
import "@picocss/pico/css/pico.css"

 function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const { data: meals, error } = await supabase.from('meals').select()
      setMeals(meals)
      console.log(meals)

      if (meals) {
        setMeals(meals)
      }
    }

    getMeals()
  }, [])

  
  async function newMeal(event) {
    event.preventDefault()
    const form = event.target

    const meal = {
      "name": form.name.value,
      "guest": form.guest.value,
      "ingredients": form.ingredients.value,
      "servings": form.servings.value,
    }
    console.log(meal)
    const result = await supabase.from("meals").insert(meal)
    if (result.error) {
      console.log(result.error.message)
      return
    }
  
  }
  function deleteMeal (id) {
    setMeals((prevMeals) => {
      return prevMeals.filter((meal) => meal.id !== id);
    });
  }

    async function insertSliders() {
      console.log("Scrumptious Sliders")
      const { error } = await supabase.from('meals').insert({ name: 'Sliders', guest: 'Flash', ingredients: '"hamburgers, "buns", "cheese"', servings: 20 })
    }

    async function insertBuffaloDip() {
      console.log("Delicious Buffalo Dip")
      const { error } = await supabase.from('meals').insert({ name: 'Buffalo Dip', guest: 'Hancock', ingredients: '"cream cheese, "buffalo sauce", "shredded chicken"', servings: 15 })
    }

    async function insertPizza() {
      console.log("Savory Pizza")
      const { error } = await supabase.from('meals').insert({ name: 'Pizza', guest: 'Captain Kirk', ingredients: '"cheese" "bread", "tomato sauce",', servings: 24 })
    }
  
  

  return (
   
      <div >
         <h1> Potluck</h1>
        <button onClick={setMeals}>Load</button>&nbsp;&nbsp;&nbsp; 
        <button onClick={insertSliders}>Add Sliders</button> &nbsp;&nbsp;&nbsp;
        <button onClick={insertBuffaloDip}>Add Buffalo Dip</button> &nbsp;&nbsp;&nbsp;
        <button onClick={insertPizza}>Add Pizza</button> &nbsp;&nbsp;&nbsp; 
        {
          meals.map((meal) => ( <MealCard key={meal.id} meal={meal}
            deleteMeal={deleteMeal} /> ))
        }
        
        <article> 
          <h1> New Meal</h1>
          <form onSubmit={newMeal}>
            <input type="text" name="guest" placeholder="Cat Woman" />
            <input type="text" name="name" placeholder="Truffle Fries" />
            <input type="text" name="ingredients" placeholder="Truffle sauce" />
            <input type="number" name="servings" placeholder="10" />
          </form>
        </article>  
      </div>  
  )
 }

 export default App