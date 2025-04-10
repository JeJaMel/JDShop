import { useLocation, useNavigate } from "react-router-dom";
import styles from "./css/ThankYouPage.module.css";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.thankYouContainer}>
      <h2 className={styles.thankYouTitle}>Thank You for Your Purchase!</h2>
      <p className={styles.purchaseMessage}>
        You purchased the following items:
      </p>
      {cart.length === 0 ? (
        <p>No items purchased</p>
      ) : (
        <ul className={styles.itemList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <span className={styles.itemName}>{item.name}</span> - $
              {item.price}
            </li>
          ))}
        </ul>
      )}

      <p className={styles.totalSpent}>Total spent: ${totalPrice.toFixed(2)}</p>
      <button className={styles.backToHomeButton} onClick={handleGoHome}>
        Go to Home Page
      </button>
    </div>
  );
};

export default ThankYouPage;
