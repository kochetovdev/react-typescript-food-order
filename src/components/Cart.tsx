import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContesxt";
import { StatusProgress } from "../types/FoodEnums";
import CartItem from "./CartItem";

const Cart = () => {
  const { items: meals, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = meals.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleCloseCart = () => {
    hideCart();
  };

  const handleGoToCheckout = () => {
    showCheckout();
  };

  const isOpen = progress === StatusProgress.CART;

  return (
    <Modal
      className="cart"
      open={isOpen}
      onClose={isOpen ? handleCloseCart : () => {}}
    >
      <h2>Your Cart</h2>
      <ul>
        {meals.map((meal) => (
          <CartItem
            key={meal.id}
            meal={meal}
            onIncrease={() => addItem(meal)}
            onDecrease={() => removeItem(meal)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {meals.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
