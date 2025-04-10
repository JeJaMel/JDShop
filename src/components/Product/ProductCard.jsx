import PropTypes from "prop-types";

const ProductCard = ({ product, onProductClick }) => {
  const handleClick = () => {
    onProductClick(product);
  };

  return (
    <div
      className="product-card"
      style={{
        position: "relative",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        textAlign: "center",
        cursor: "pointer", 
      }}
      onClick={handleClick}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "5px",
          maxWidth: "200px",
          maxHeight: "200px", 
          objectFit: "cover",
        }}
      />
      <h3>{product.name}</h3>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>

      {product.stock <= 0 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Out of Stock
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
  onProductClick: PropTypes.func.isRequired,
};

export default ProductCard;
