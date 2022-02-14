import { useContext } from "react";

import { CartContext, CartActionTypes } from "../../cart-context";

import "./navigation.styles.css";

const Navigation = () => {
  const {
    dispatch,
    state: { isOpen },
  } = useContext(CartContext);

  const toggleCart = () =>
    dispatch({ type: CartActionTypes.SET_IS_OPEN, payload: !isOpen });

  return (
    <nav className="navigation-bar">
      <div className="cart-icon" onClick={toggleCart}>
        Cart
      </div>
    </nav>
  );
};

export default Navigation;
