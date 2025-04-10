import { useState } from "react";
import { db, collection, addDoc } from "../../firebase/firebase";
import PropTypes from "prop-types";

const AddProductForm = ({ currentUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [provider, setProvider] = useState("");

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

    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        stock,
        provider: provider || currentUser.email,
        userId: currentUser.uid,
      });

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategory("");
      setStock(0);
      setProvider("");

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. See console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="description"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
            height: "100px",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="price"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Price:
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="imageUrl"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Image URL:
        </label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="category"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="stock"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Stock:
        </label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="1"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="provider"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Provider:
        </label>
        <input
          type="email"
          id="provider"
          value={provider} // Default to user's email
          onChange={(e) => setProvider(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Add Product
      </button>
    </form>
  );
};

AddProductForm.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
};

export default AddProductForm;
