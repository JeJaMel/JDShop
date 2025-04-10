import { useState } from "react";
import { db, collection, addDoc } from "../../firebase/firebase";
import { useAuth } from "../../contexts/UseAuth";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const { currentUser } = useAuth();

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Sports & Outdoors",
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
        userId: currentUser.uid,
      });

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategory("");

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. See console for details.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2>Add New Product</h2>
      {currentUser ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px" }}
            >
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
              <option value="">Select a category</option> {/* Default option */}
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
      ) : (
        <p>You must be logged in to add products.</p>
      )}
    </div>
  );
};

export default AddProductForm;
