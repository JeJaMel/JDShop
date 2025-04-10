import { useState } from "react";
import { useCart } from "../../contexts/UseCart";
import { useAuth } from "../../contexts/UseAuth";
import PropTypes from "prop-types";

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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>{product.name}</h2>
        <img
          src={product.imageUrl || "placeholder_image_url"}
          alt={product.name}
          style={{ width: "200px", height: "200px" }}
        />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Provider: {product.provider}</p>
        <p>Stock Available: {product.stock}</p>
        {currentUser ? (
          <button onClick={handleAddToCart} disabled={isAddingToCart}>
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        ) : (
          <p>You must be logged in to add products to the cart.</p>
        )}
        <button onClick={onClose}>Close</button>
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
