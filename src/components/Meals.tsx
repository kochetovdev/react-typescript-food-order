import { useEffect, useState } from "react";
import { fetchMeals } from "../api/mealApi";
import { Meal as MealType } from "../types/foodTypes";
import MealItem from "./MealItem";
import Error from "./Error";

const Meals = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMeals() {
      try {
        setIsLoading(true);
        const res = await fetchMeals();
        setMeals(res.data);
      } catch (error) {
        setError(`${error}` || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
    getMeals();
  }, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
