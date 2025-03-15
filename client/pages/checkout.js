import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withAuth from "../hoc/withAuth";
import { placeOrder } from "@/api/orderService";
import { getCartItems } from "@/api/cartService";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        if (response && response[0].items) {
          setCart(response[0].items);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async (cart) => {
    try {
      await placeOrder(cart);
      router.push("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛍️ Checkout</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.productId.name} - ₹{item.productId.price} x{" "}
                  {item.quantity}
                </span>
                <span className="fw-bold">
                  ₹{item.productId.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-center">
            <h4>
              Total: <strong>₹{totalPrice}</strong>
            </h4>
            <button
              className="btn btn-primary mt-3 px-4"
              onClick={() => {
                handlePlaceOrder(cart);
              }}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
            <button
              className="btn btn-secondary mt-3 ms-3 px-4"
              onClick={() => router.push("/cart")}
            >
              Back to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(Checkout);
