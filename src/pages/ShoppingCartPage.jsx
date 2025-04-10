import { useCart } from "../contexts/UseCart";
import { db, doc, updateDoc } from "../firebase/firebase";
import { useProducts } from "../contexts/UseProducts";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { products } = useProducts(); // Get products list
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    try {
      // Iterate through the products in the cart and update their stock
      for (const item of cart) {
        // Find the product in the products list from ProductsContext
        const productFromContext = products.find((p) => p.id === item.id);

        if (productFromContext) {
          const newStock = productFromContext.stock - item.quantity;

          if (newStock < 0) {
            alert(`Not enough stock for ${item.name}`);
            return; // Stop checkout if not enough stock
          }

          // Update stock in Firestore
          const productRef = doc(db, "products", item.id);
          await updateDoc(productRef, { stock: newStock });
        } else {
          console.warn(
            `Product with ID ${item.id} not found in products context`
          );
        }
      }

      // If all stocks updated successfully, clear the cart and redirect
      clearCart();
      navigate("/thanks"); // Redirect to Thank You page
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity || 1} = $
              {item.price * (item.quantity || 1)}
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${totalPrice}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default ShoppingCartPage;