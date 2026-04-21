import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  const removeOrder = async (id) => {
    try {
      await fetch(`our-store-server-production-087e.up.railway.app/api/orders/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Order delete failed", err);
    }

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  useEffect(() => {
    fetch("our-store-server-production-087e.up.railway.app/api/orders/user/1") // abhi hardcoded userId
      .then(res => res.json())
      .then(data => {
        console.log("Orders:", data);
        setOrders(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => {
          const createdAt = order.createdAt || order.date || order.orderedAt || order.timestamp;
          const orderTime = createdAt ? new Date(createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) : "Date unavailable";

          return (
            <div key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>

              <p>Status: {order.status}</p>
              <p>Total: ₹{order.totalAmount}</p>
              <small>Ordered: {orderTime}</small>

              <div className="order-card-actions">
                <Link to={`/orders/${order.id}`} className="view-btn">View Details</Link>
                <button className="remove-btn" onClick={() => removeOrder(order.id)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}

      <br />
      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
}

export default Orders;