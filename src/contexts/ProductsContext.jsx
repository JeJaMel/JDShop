import { createContext, useState, useEffect } from "react";
import { db, collection, onSnapshot } from "../firebase";
import PropTypes from "prop-types";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productsCollection = collection(db, "products"); //
    const unsubscribe = onSnapshot(
      productsCollection,
      (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    products,
    loading,
    error,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };