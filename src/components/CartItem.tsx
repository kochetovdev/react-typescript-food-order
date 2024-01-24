import { Meal } from "../types/foodTypes";
import { currencyFormatter } from "../utils/formatting";

interface Props {
  meal: Meal;
  onIncrease: (meal: Meal) => void;
  onDecrease: (meal: Meal) => void;
}

const CartItem = ({ meal, onDecrease, onIncrease }: Props) => {
  const { name, quantity, price } = meal;
  return (
    <li>
      <p>
        {name} - {quantity} * {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => onDecrease(meal)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onIncrease(meal)}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
