import { useState, useEffect } from "react";
import { useAuth } from "../contexts/UseAuth";
import Wait from "../components/Loaders/Wait";
import styles from "./css/ProfilePage.module.css"; 
import { BiSolidTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import {
  db,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "../firebase/firebase";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState(""); // New state for image URL
  const [loading, setLoading] = useState(true);

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
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchUserProducts();
  }, [currentUser]);

  const handleDeleteProduct = async (productId) => {
    try {
      const productDocRef = doc(db, "products", productId);
      await deleteDoc(productDocRef);
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
    setEditedImageUrl(product.imageUrl); 
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) return;

    try {
      const productDocRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productDocRef, {
        name: editedName,
        description: editedDescription,
        price: parseFloat(editedPrice),
        imageUrl: editedImageUrl, // Save the image URL
      });

      setUserProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                name: editedName,
                description: editedDescription,
                price: parseFloat(editedPrice),
                imageUrl: editedImageUrl, // Update image URL in state
              }
            : product
        )
      );

      closeModal();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. See console for details.");
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <Wait />;
  }

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>{currentUser.email} Products:</h2>
      {userProducts.length === 0 ? (
        <p className={styles.noProductsMessage}>
          You have not add any products yet.
        </p>
      ) : (
        <ul className={styles.productList}>
          {userProducts.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.productImage} // Add product image class
              />
              <span className={styles.productName}>
                {product.name} - ${product.price}
              </span>
              <div>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditProduct(product)}
                >
                  <BiEdit className={styles.Uicon} />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <BiSolidTrash className={styles.Uicon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Edit Product</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>
                Description:
              </label>
              <textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className={styles.formTextarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.formLabel}>
                Price:
              </label>
              <input
                type="number"
                id="price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                className={styles.formInput}
              />
            </div>
            {/* Image URL Input */}
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl" className={styles.formLabel}>
                Image URL:
              </label>
              <input
                type="text"
                id="imageUrl"
                value={editedImageUrl}
                onChange={(e) => setEditedImageUrl(e.target.value)}
                className={styles.formInput}
              />
            </div>
            <button className={styles.saveButton} onClick={handleSaveProduct}>
              Save
            </button>
            <button className={styles.cancelButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
