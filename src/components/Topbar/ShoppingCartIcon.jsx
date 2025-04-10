import { useCart } from "../../contexts/UseCart";

const ShoppingCartIcon = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return <div>🛒 ({itemCount})</div>;
};

export default ShoppingCartIcon;
