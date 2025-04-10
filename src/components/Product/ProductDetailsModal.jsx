import { useState } from "react";
import { useCart } from "../../contexts/UseCart";
import { useAuth } from "../../contexts/UseAuth";
import PropTypes from "prop-types";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../css/Product/ProductDetailsModal.module.css";

const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart, cart } = useCart();
  const { currentUser } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    if (!isAddingToCart) {
      setIsAddingToCart(true);

      const existingCartItem = cart.find((item) => item.id === product.id);
      const currentQuantityInCart = existingCartItem
        ? existingCartItem.quantity
        : 0;

      if (currentQuantityInCart + 1 > product.stock) {
        alert(`You can only add up to ${product.stock} of this item.`);
        setIsAddingToCart(false);
        return;
      }

      addToCart(product, product.stock);
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          x
        </button>
        <h2 className={styles.title}>{product.name}</h2>
        <img
          src={product.imageUrl || "placeholder_image_url"}
          alt={product.name}
          className={styles.productImage}
        />
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Price: ${product.price}</p>
        <p className={styles.provider}>Provider: {product.provider}</p>
        <p className={styles.stock}>Stock Available: {product.stock}</p>

        {currentUser ? (
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`${styles.button} ${styles.addToCartButton}`}
          >
            {isAddingToCart ? (
              "Adding..."
            ) : (
              <BsCartPlus className={`${styles.icon}`} />
            )}
          </button>
        ) : (
          <p className={styles.loginMessage}>
            You must be logged in to add products to the cart.
          </p>
        )}
      </div>
    </div>
  );
};

ProductDetailsModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    provider: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductDetailsModal;
