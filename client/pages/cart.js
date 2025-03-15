import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../hoc/withAuth";
import { getCartItems, removeFromCart, clearCart } from "@/api/cartService";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        if (
          response &&
          Array.isArray(response) &&
          response.length > 0 &&
          response[0].items &&
          response[0].items.length > 0
        ) {
          setCart(response[0].items);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart(cart.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart([]); // Clear the cart state
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div key={item._id} className="col-md-6 mb-4">
              <div className="card shadow-lg">
                <div className="row g-0">
                  <div className="col-4">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="img-fluid rounded-start"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.productId.name}</h5>
                      <p className="card-text text-muted">
                        {item.productId.description}
                      </p>
                      <p className="card-text">
                        Price: <strong>₹{item.productId.price}</strong>
                      </p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(item.productId._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h4>
            Total: <strong>₹{totalPrice}</strong>
          </h4>
          <button
            className="btn btn-success mt-3 px-4 me-3"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </button>
          <button
            className="btn btn-warning mt-3 px-4"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(Cart);
