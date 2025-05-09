import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ThankYouPage from "./pages/ThankYouPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shopping_car" element={<ShoppingCartPage />} />
              <Route path="/thanks" element={<ThankYouPage />} />
              <Route path="/profile" element={<ProfilePage />} />{" "}
            </Routes>
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
