import { useState, useEffect } from "react";
import { useAuth } from "../contexts/UseAuth";
import {
  db,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc, // Import updateDoc
} from "../firebase/firebase";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the product being edited
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (currentUser) {
        const productsCollection = collection(db, "products");
        const q = query(
          productsCollection,
          where("userId", "==", currentUser.uid)
        );

        try {
          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserProducts(products);
        } catch (error) {
          console.error("Error fetching user's products:", error);
        }
      }
    };

    fetchUserProducts();
  }, [currentUser]);

  const handleDeleteProduct = async (productId) => {
    try {
      const productDocRef = doc(db, "products", productId);
      await deleteDoc(productDocRef);
      // Update the state to remove the deleted product
      setUserProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. See console for details.");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditedName(product.name);
    setEditedDescription(product.description);
    setEditedPrice(product.price);
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) return; // Nothing to save

    try {
      const productDocRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productDocRef, {
        name: editedName,
        description: editedDescription,
        price: parseFloat(editedPrice),
      });

      // Update the state to reflect the changes
      setUserProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                name: editedName,
                description: editedDescription,
                price: parseFloat(editedPrice),
              }
            : product
        )
      );

      closeModal(); // Close the modal after saving
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. See console for details.");
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2>{currentUser.email} Products:</h2>
      {userProducts.length === 0 ? (
        <p>You have not add any products yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {userProducts.map((product) => (
            <li
              key={product.id}
              style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}
            >
              {product.name} - ${product.price}
              <button
                onClick={() => handleEditProduct(product)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Product Modal */}
      {selectedProduct && (
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
            <h2>Edit Product</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleSaveProduct}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
