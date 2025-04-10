import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Wait from "../components/Loaders/Wait";

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  const addToCart = (product, availableStock) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + 1, availableStock); // Respect the stock limit

        if (newQuantity > existingItem.quantity) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          );
        } else {
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

   const clearCart = async (callback) => {
     const cartCopy = [...cart]; // Create a copy of the cart
     console.log("clearCart called", cartCopy); //Add this log
     await setCart([]); // Use await to ensure the state is updated before proceeding
     console.log("cart after setCart", cart); //Add this log
     if (callback) {
       console.log("callback called"); //Add this log
       callback(cartCopy); // Execute the callback with the cart copy
     }
   };
  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  if (loading) return <Wait />;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
