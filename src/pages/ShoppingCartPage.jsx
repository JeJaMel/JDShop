import { useCart } from "../contexts/UseCart";
import { db, doc, updateDoc } from "../firebase/firebase";
import { useProducts } from "../contexts/UseProducts";
import { useNavigate } from "react-router-dom";
import styles from "./css/ShoppingCartPage.module.css"; 

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
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>${item.price}</p>
                <p className={styles.itemQuantity}>
                  Quantity: {item.quantity || 1}
                </p>
                <p className={styles.itemSubtotal}>
                  Subtotal: ${item.price * (item.quantity || 1)}
                </p>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>Total: ${totalPrice}</div>
      <button
        className={styles.checkoutButton}
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Checkout
      </button>
    </div>
  );
};

export default ShoppingCartPage;
