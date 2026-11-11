function MealCard({ meal, deleteMeal }) {


    function Delete() {
        deleteMeal(meal.id)
    }

  return (
    <div className="card">
      <h2>{meal.name}</h2>
      <p>Brought by {meal.guest}</p>
      <p>Ingredients:{meal.ingredients}</p>
      <p>Serving size of {meal.servings}</p>
      <button onClick={Delete}>Delete</button>
    </div>
  )
}

export default MealCard