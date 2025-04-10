import { useState, useEffect, useRef } from "react";
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
  const [tempCategoryFilter, setTempCategoryFilter] = useState(
    categoryFilter ? categoryFilter.split(",") : []
  );
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempDateSort, setTempDateSort] = useState(dateSort);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const categoryDropdownRef = useRef(null);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Sports & Outdoors",
    "Toys & Games",
    "Health & Beauty",
    "Automotive",
    "Jewelry & Accessories",
    "Baby Products",
    "Office Supplies",
    "Pet Supplies",
    "Groceries & Gourmet Food",
    "Music & Movies",
    "Garden & Outdoor",
    "Tools & Hardware",
    "Shoes & Bags",
    "Art & Craft Supplies",
    "Furniture",
    "Travel & Luggage",
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleApplyFilter = () => {
    setCategoryFilter(tempCategoryFilter.join(","));
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setDateSort(tempDateSort);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setTempCategoryFilter([]);
    setTempMinPrice("");
    setTempMaxPrice("");
    setTempDateSort("");

    setCategoryFilter("");
    setMinPrice("");
    setMaxPrice("");
    setDateSort("");
    setIsFilterOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <h2>Filter Products</h2>

            {/* Category Dropdown */}
            <label>Categories:</label>
            <div
              style={{ position: "relative", marginBottom: "10px" }}
              ref={categoryDropdownRef}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                {tempCategoryFilter.length > 0
                  ? tempCategoryFilter.join(", ")
                  : "Select categories"}
              </div>

              {isCategoryDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 10,
                  }}
                >
                  {categories.map((category) => (
                    <label
                      key={category}
                      style={{
                        display: "block",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={category}
                        checked={tempCategoryFilter.includes(category)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          if (checked) {
                            setTempCategoryFilter((prev) => [...prev, value]);
                          } else {
                            setTempCategoryFilter((prev) =>
                              prev.filter((c) => c !== value)
                            );
                          }
                        }}
                        style={{ marginRight: "8px" }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filters */}
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

            {/* Date Sort */}
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
