import { useState } from "react";
import { useProducts } from "../../contexts/UseProducts";

const SearchBar = () => {
  const {
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
  } = useProducts();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCategoryFilter, setTempCategoryFilter] = useState(categoryFilter);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempDateSort, setTempDateSort] = useState(dateSort);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleApplyFilter = () => {
    setCategoryFilter(tempCategoryFilter);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setDateSort(tempDateSort);
    setIsFilterOpen(false); // Close filter after applying
  };

  const handleResetFilter = () => {
    setTempCategoryFilter("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setTempDateSort("");

    setCategoryFilter("");
    setMinPrice("");
    setMaxPrice("");
    setDateSort("");
    setIsFilterOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={toggleFilter}>Filter</button>

      {isFilterOpen && (
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
            zIndex: 1000, // Make sure it's on top
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "500px", // Adjust as needed
            }}
          >
            <h2>Filter Products</h2>
            <label>Category:</label>
            <input
              type="text"
              value={tempCategoryFilter}
              onChange={(e) => setTempCategoryFilter(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Min Price:</label>
            <input
              type="number"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Max Price:</label>
            <input
              type="number"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Date:</label>
            <select
              value={tempDateSort}
              onChange={(e) => setTempDateSort(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <button onClick={handleApplyFilter} style={{ marginRight: "10px" }}>
              Apply Filter
            </button>
            <button onClick={handleResetFilter}>Reset Filter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
