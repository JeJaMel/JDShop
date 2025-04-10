import { useState } from "react";
import { db, collection, addDoc } from "../../firebase/firebase";
import PropTypes from "prop-types";
import styles from "../../css/Product/AddProductForm.module.css";

const AddProductForm = ({ currentUser, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [provider, setProvider] = useState(currentUser?.email || ""); // Initialize with current user's email

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to add products.");
      return;
    }

    if (!imageUrl) {
      alert("Please provide an image URL.");
      return;
    }

    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        stock,
        provider: provider, 
        userId: currentUser.uid,
      });

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategory("");
      setStock(0);
      setProvider(currentUser?.email || ""); 
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. See console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton} 
      >
        ×
      </button>
      <h2 className={styles.title}>Add New Product</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="stock">Stock:</label>
        <input
          id="stock"
          type="number"
          min="1"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="provider">Provider:</label>
        <input
          id="provider"
          type="text"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Add Product
      </button>
    </form>
  );
};

AddProductForm.propTypes = {
  onClose: PropTypes.func,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
};

export default AddProductForm;
