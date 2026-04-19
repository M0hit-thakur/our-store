import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const location = useLocation();
  const selectedItem = location.state?.selectedItem;
  const checkoutItems = selectedItem ? [selectedItem] : cart;

  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * (item.qty ?? item.quantity ?? 1),
    0
  );

  // 🔥 MAIN FUNCTION
  const placeOrder = async () => {

    if (!form.name || !form.address || !form.city || !form.phone) {
      toast.error("Fill all details ❗");
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("Cart empty ❌");
      return;
    }

    try {
      // 🟡 STEP 1: Create Razorpay Order
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: total })
      });

      const data = await res.json();

      // 🟡 STEP 2: Razorpay Options
      const options = {
        key: "rzp_test_SchbY9f5Y64zv8", // test key
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          console.log("PAYMENT SUCCESS:", response);

          // 🔥 STEP 3: SEND ORDER TO BACKEND
          const orderData = checkoutItems.map(item => ({
            productId: item.id,
            quantity: item.qty ?? item.quantity ?? 1
          }));

          console.log("Sending:", orderData);

          try {
            const orderRes = await fetch(
              "http://localhost:8080/api/orders/place/1",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
              }
            );

            if (!orderRes.ok) throw new Error("Order save failed");

            toast.success("Order placed 🎉");

            if (selectedItem) {
              setCart((prevCart) => prevCart.filter((item) => item.id !== selectedItem.id));
            } else {
              setCart([]);
            }
            navigate("/orders");

          } catch (err) {
            console.error(err);
            toast.error("Order save failed ❌");
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled ❌");
          }
        },

        prefill: {
          name: form.name,
          contact: form.phone
        },

        theme: {
          color: "#ff9900"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error("Payment failed ❌");
    }
  };

  return (
    <div className="checkout-container">
      <h1>💳 Checkout</h1>

      <div className="checkout-grid">

        {/* LEFT */}
        <div className="checkout-form">
          <h2>Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name} x {item.qty ?? item.quantity ?? 1}</span>
              <span>₹{item.price * (item.qty ?? item.quantity ?? 1)}</span>
            </div>
          ))}

          <hr />

          <h3>Total: ₹{total}</h3>

          <button className="place-order-btn" onClick={placeOrder}>
            Pay & Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;