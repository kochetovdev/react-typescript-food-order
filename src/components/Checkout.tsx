import { ChangeEvent, useContext, useState } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContesxt";
import { StatusProgress } from "../types/FoodEnums";
import { postMeal } from "../api/mealApi";
import { OrderData } from "../types/foodTypes";
import Error from "./Error";

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const [sendingData, setSendingData] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccsess] = useState(false);

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleClose = () => {
    hideCheckout();
  };

  const handleFinish = () => {
    hideCheckout();
    clearCart();
  };

  const handleSuccess = () => {
    setSuccsess(true);
    clearCart();
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    const orderData: OrderData = {
      order: {
        items,
        customer: customerData,
      },
    };

    try {
      setSendingData(true);
      await postMeal(orderData);
    } catch (error) {
      setError(`${error}`);
      console.error("Error posting meal:", error);
    } finally {
      setSendingData(false);
    }
  };

  if (success && !error) {
    return (
      <Modal open={progress === StatusProgress.CHECKOUT} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === StatusProgress.CHECKOUT} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Adress" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          {sendingData ? (
            <p>Sending data...</p>
          ) : (
            <Button onClick={handleSuccess}>Submit Order</Button>
          )}
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
