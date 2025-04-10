import PropTypes from "prop-types";
import styles from "../../css/Product/ProductCard.module.css"; // Import CSS Module

const ProductCard = ({ product, onProductClick }) => {
  const handleClick = () => {
    onProductClick(product);
  };

  return (
    <div className={styles.productCard} onClick={handleClick}>
      {" "}
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>
         {product.price}$
      </p>
      {product.stock <= 0 && (
        <div className={styles.outOfStock}> Out of Stock</div>
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
