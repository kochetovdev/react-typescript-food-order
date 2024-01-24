import axios, { AxiosError } from "axios";
import { BaseUrl } from "../utils/baseURL";
import { OrderData } from "../types/foodTypes";

class MealService {
  static async getMeals() {
    try {
      const res = await axios.get(`${BaseUrl}/meals`);

      if (res.status !== 200) {
        throw new Error("Server error.");
      }

      return res;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }

  static async postMeal(orderData: OrderData) {
    try {
      const res = await axios.post(`${BaseUrl}/orders`, orderData);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export default MealService;
