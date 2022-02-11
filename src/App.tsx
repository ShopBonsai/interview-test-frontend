import { useState } from "react";

import Cart from "./components/cart/cart";

import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="App">
      <nav></nav>
      <Cart />
    </div>
  );
}

export default App;
