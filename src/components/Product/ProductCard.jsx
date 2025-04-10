import PropTypes from "prop-types";

const ProductCard = ({ product, onProductClick }) => {
  return (
    <div onClick={() => onProductClick(product)}>
      <img
        src={product.imageUrl || "placeholder_image_url"}
        alt={product.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string,
    }).isRequired,
    onProductClick: PropTypes.func.isRequired,
    };

export default ProductCard;
