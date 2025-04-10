import { useCart } from "../../contexts/UseCart";
import { useAuth } from "../../contexts/UseAuth";
import PropTypes from "prop-types";

const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const handleAddToCart = () => {
    addToCart(product);
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
        {currentUser ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <p>Please log in to add to cart.</p>
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
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    };

export default ProductDetailsModal;
