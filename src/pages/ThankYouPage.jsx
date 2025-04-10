import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/UseCart";

const ThankYouPage = () => {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Clear the cart after displaying the thank you message.  
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div>
      <h2>Thank You for Your Purchase!</h2>
      <p>You purchased the following items:</p>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity || 1}
          </li>
        ))}
      </ul>
      <p>Total spent: ${totalPrice}</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
