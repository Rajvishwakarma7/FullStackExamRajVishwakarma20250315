import { useEffect, useState } from "react";
import withAuth from "../hoc/withAuth";
import { getUserOrders } from "@/api/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        if (res.status === "ok") {
          setOrders(res.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0 rounded">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.id}</h5>
                  <p className="card-text">
                    <strong>Total:</strong> ₹{order.total}
                  </p>
                  <p className="card-text text-muted">
                    <small>Placed on:{order.created_at}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(Orders);
