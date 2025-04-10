import { useState } from "react";
import SearchBar from "./SearchBar";
import LoginRegister from "./LoginRegister";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/UseAuth";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import AddProductForm from "../Product/AddProductForm";
import styles from "../../css/Topbar/Topbar.module.css"; 

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
    <header className={styles.header}>
      {" "}
      <Link to="/">
        <img
          src={logoImageUrl}
          alt="JDShop Logo"
          className={styles.logo}
        />
      </Link>
      <SearchBar />
      <div className={styles.actions}>
        {" "}
        {currentUser ? (
          <>
            <Link to="/profile" className={styles.profileLink}>
              {" "}
              <button className={styles.button}>Profile</button>
            </Link>
            <button onClick={openAddProduct} className={styles.button}>
              Add Product
            </button>{" "}
            <button onClick={handleLogout} className={styles.button}>
              Logout
            </button>{" "}
          </>
        ) : (
          <button onClick={openModal} className={styles.button}>
            Login / Register
          </button> 
        )}
        <Link to="/shopping_car">
          <ShoppingCartIcon />
        </Link>
      </div>
      <LoginRegister isOpen={isModalOpen} onClose={closeModal} />
      {isAddProductOpen && (
        <div className={styles.modalOverlay}>
          {" "}
          <div className={styles.modalContent}>
            {" "}
            <AddProductForm currentUser={currentUser} />
            <button onClick={closeAddProduct} className={styles.button}>
              Close
            </button>{" "}

          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
