import mealService from "../services/mealService";
import { OrderData } from "../types/foodTypes";

export async function fetchMeals() {
  try {
    const res = await mealService.getMeals();
    return res;
  } catch (error) {
    throw error;
  }
}

export async function postMeal(orderData: OrderData) {
  try {
    const res = await mealService.postMeal(orderData);
    return res;
  } catch (error) {
    throw error;
  }
}
