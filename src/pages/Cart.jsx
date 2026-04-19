import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";  

function Cart({ cart, setCart }) {

  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: (item.qty ?? item.quatity ?? 1) + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item => {
      if (item.id !== id) return item;
      const currentQty = item.qty ?? item.quatity ?? 1;
      return currentQty > 1
        ? { ...item, qty: currentQty - 1 }
        : item;
    }));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.qty ?? item.quatity ?? 1),
    0
  );

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div>
          <h1>🛒 Your Cart</h1>
          <p>Review your selected items and continue shopping anytime.</p>
        </div>
        <Link to="/" className="back-btn">← Continue Shopping</Link>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty 😢</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="cart-card">
                <img src={item.image || item.imageUrl} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <h4>₹{item.price}</h4>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty ?? item.quatity ?? 1}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      className="order-now-btn"
                      onClick={() => navigate("/checkout", { state: { selectedItem: item } })}
                    >
                      Order Now
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ₹{total}</h2>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;