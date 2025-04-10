import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../contexts/UseProducts";
import styles from "../../css/Topbar/SearchBar.module.css";

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
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setIsFilterOpen(!isFilterOpen)}>Filter</button>

      {isFilterOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Filter Products</h2>

            <label>Categories:</label>
            <div className={styles.dropdownContainer} ref={categoryDropdownRef}>
              <div
                className={styles.dropdownTrigger}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                {tempCategoryFilter.length > 0
                  ? tempCategoryFilter.join(", ")
                  : "Select categories"}
              </div>

              {isCategoryDropdownOpen && (
                <div className={styles.dropdownList}>
                  {categories.map((category) => (
                    <label key={category} className={styles.dropdownItem}>
                      <input
                        type="checkbox"
                        value={category}
                        checked={tempCategoryFilter.includes(category)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const value = e.target.value;
                          setTempCategoryFilter((prev) =>
                            checked
                              ? [...prev, value]
                              : prev.filter((c) => c !== value)
                          );
                        }}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <label>Min Price:</label>
            <input
              type="number"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              className={styles.input}
            />

            <label>Max Price:</label>
            <input
              type="number"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              className={styles.input}
            />

            <label>Date:</label>
            <select
              value={tempDateSort}
              onChange={(e) => setTempDateSort(e.target.value)}
              className={styles.input}
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
