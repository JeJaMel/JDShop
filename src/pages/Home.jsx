import { useState } from "react";
import { useProducts } from "../contexts/UseProducts";
import ProductCard from "../components/Product/ProductCard";
import ProductDetailsModal from "../components/Product/ProductDetailsModal";
import  Wait  from "../components/Loaders/Wait"; 

const Home = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <Wait />; 
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div>
      <h2>Home Page</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
