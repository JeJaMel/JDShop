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
    <div className={styles.cart}>
      <BsCart4/> ({itemCount})
    </div>
  );
};

export default ShoppingCartIcon;
