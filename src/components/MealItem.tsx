import { useContext } from "react";
import { Meal as MealType } from "../types/foodTypes";
import { BaseUrl } from "../utils/baseURL";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

interface Props {
  meal: MealType;
}

const MealItem = ({ meal }: Props) => {
  const { addItem } = useContext(CartContext);

  const handleAddMealToCart = () => {
    addItem(meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`${BaseUrl}/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
