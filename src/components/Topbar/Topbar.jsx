import { useState } from "react";
import SearchBar from "./SearchBar";
import LoginRegister from "./LoginRegister";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/UseAuth";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import AddProductForm from "../Product/AddProductForm";

const Topbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false); 
  const { currentUser } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const closeAddProduct = () => {
    setIsAddProductOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const logoImageUrl = "name.png";

  return (
    <header
      style={{
        backgroundColor: "#f0f0f0",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img
          src={logoImageUrl}
          alt="JDShop Logo"
          style={{
            height: "50px",
            width: "auto",
            cursor: "pointer",
          }}
        />
      </Link>
      <SearchBar />
      <div>
        {currentUser ? (
          <>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <button onClick={openAddProduct}>Add Product</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={openModal}>Login / Register</button>
        )}
        <Link to="/shopping_car">
          <ShoppingCartIcon />
        </Link>
      </div>
      <LoginRegister isOpen={isModalOpen} onClose={closeModal} />

      {isAddProductOpen && (
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
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "500px",
            }}
          >
            <AddProductForm currentUser={currentUser} />{" "}
            <button onClick={closeAddProduct}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
