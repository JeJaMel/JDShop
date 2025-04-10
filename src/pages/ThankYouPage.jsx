import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/UseCart";

const ThankYouPage = () => {
  const { cart, clearCart } = useCart();
  const [copiedCart, setCopiedCart] = React.useState([]);
  const [copiedTotal, setCopiedTotal] = React.useState(0);
  const [isCartCleared, setIsCartCleared] = React.useState(false);

  React.useEffect(() => {
    if (cart.length > 0 && !isCartCleared) {
      setCopiedCart(cart);
      const total = cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
      setCopiedTotal(total);

      const timer = setTimeout(() => {
        clearCart();
        setIsCartCleared(true); 
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [cart, clearCart, isCartCleared]);

  return (
    <div>
      <h2>Thank You for Your Purchase!</h2>
      <p>You purchased the following items:</p>
      <ul>
        {copiedCart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity || 1}
          </li>
        ))}
      </ul>
      <p>Total spent: ${copiedTotal.toFixed(2)}</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
