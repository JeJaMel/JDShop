import { useState } from "react";
import SearchBar from "./SearchBar";
import LoginRegister from "./LoginRegister";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/UseAuth";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const Topbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

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
      <h1>JDShop</h1>
      <SearchBar />
      <div>
        {currentUser ? (
          <>
            <span>Welcome, {currentUser.email}</span>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
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
    </header>
  );
};

export default Topbar;
