import { useCart } from "../../contexts/UseCart";
import { BsCart4 } from "react-icons/bs";
import styles from "./../../css/Topbar/ShoppingCartIcon.module.css";

const ShoppingCartIcon = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div
      className={styles.cart}
      aria-label={`Shopping Cart with ${itemCount} items`}
    >
      <BsCart4 className={styles.icon} />
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </div>
  );
};

export default ShoppingCartIcon;
