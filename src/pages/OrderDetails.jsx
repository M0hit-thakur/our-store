import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams(); // URL se id milegi
  const [order, setOrder] = useState(null);

  useEffect(() => {
  fetch(`${API}/api/orders/place/${userId}`) // abhi hardcoded userId
    .then(res => {
      if (!res.ok) {
        throw new Error("Error: " + res.status);
      }
      return res.json();
    })
    .then(data => setOrder(data))
    .catch(err => console.error(err));
},
 []);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-details-container">
      <h2>📦 Order Details</h2>

      <div className="order-card">
        <p><b>Order ID:</b> {order.id}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Total:</b> ₹{order.totalAmount}</p>

        {/* Agar items aaye toh */}
        {order.items && (
          <>
            <h3>Items:</h3>
            {order.items.map((item, index) => (
              <div key={index}>
                <p>{item.productName}</p>
                <p>₹{item.price}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <br />
      <Link to="/orders">⬅ Back to Orders</Link>
    </div>
  );
}

export default OrderDetails;