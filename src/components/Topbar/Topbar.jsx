import SearchBar from "./SearchBar";
import LoginRegister from "./LoginRegister";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Link } from "react-router-dom";

const Topbar = () => {
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
        <LoginRegister />
        <Link to="/shopping_car">
          <ShoppingCartIcon />
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
