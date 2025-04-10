import React, { createContext, useState, useEffect } from "react";
import {
  db,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "../firebase/firebase";
import PropTypes from "prop-types";

const ProductsContext = createContext();
export default ProductsContext;

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dateSort, setDateSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsCollection = collection(db, "products");
        let q = query(productsCollection);

        if (dateSort) {
          q = query(q, orderBy("createdAt", dateSort));
        }

        const unsubscribe = onSnapshot(
          q,
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
      } catch (error) {
        console.error("Error setting up snapshot listener:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dateSort]);

  const filteredProducts = React.useMemo(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    // Filter by categories
    if (categoryFilter) {
      const categoriesArray = categoryFilter.split(",");
      filtered = filtered.filter((product) =>
        categoriesArray.includes(product.category)
      );
    }

    return filtered;
  }, [products, searchTerm, categoryFilter, minPrice, maxPrice]);

  const value = {
    products: filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    dateSort,
    setDateSort,
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
