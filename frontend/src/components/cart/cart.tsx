import { useContext } from "react";

import CartItem from "../cart-item/cart-item";
import { CartContext } from "../../cart-context";

import "./cart.styles.css";

// REPLACE WITH YOUR OWN CART ITEMS
const TEMPORARY_ITEMS = [
  {
    id: 1,
    name: "Black Hat",
    imageSrc:
      "https://media.istockphoto.com/photos/hat-on-white-background-picture-id526131500?b=1&k=20&m=526131500&s=170667a&w=0&h=TVhckgzmxLZ6b1V74eel7XbFy73tldESzBcH0ZG6g0c=",
  },
];

const Cart = () => {
  const { setIsOpen } = useContext(CartContext);

  const closeCart = () => setIsOpen(false);

  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button" onClick={closeCart}>
          →
        </button>
        <div className="cart-items-container">
          {TEMPORARY_ITEMS.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
