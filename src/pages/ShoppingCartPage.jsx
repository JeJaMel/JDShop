import { useCart } from '../contexts/UseCart';
import { Link } from 'react-router-dom';

const ShoppingCartPage = () => {
    const { cart, removeFromCart } = useCart();

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price} x {item.quantity || 1} = ${item.price * (item.quantity || 1)}
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${totalPrice}</p>
            <Link to="/thanks">
                <button>Checkout</button>
            </Link>
        </div>
    );
};

export default ShoppingCartPage;