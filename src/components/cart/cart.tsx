import "./cart.styles.css";

const Cart = () => {
  return (
    <div className="cart-modal">
      <div className="cart-container">
        <button className="close-button">→</button>
        <div className="cart-items-container"></div>
      </div>
    </div>
  );
};

export default Cart;
