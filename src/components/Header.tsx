import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContesxt";

const Header = () => {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalItems = items.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  const handleShowCart = () => {
    showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restuarant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
