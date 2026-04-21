import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home({ cart, setCart, themeOn, setThemeOn }) {
  const [products,setProducts,] = useState([]);
  const [category, setCategory] = useState("All");

  // Filter
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        toast.info("Product already in cart!");
        return prevCart;
      }
      toast.success("Added to cart!");
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const animationToCart = (imgElement) => {
    const cart = document.getElementById("cart-icon");
    
    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = imgElement.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.transition = "all 0.8s ease";
    clone.style.zIndex = 1000;

    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.left = cartRect.left + "px";
      clone.style.top = cartRect.top + "px";
      clone.style.width = "30px";
      clone.style.height = "30px";
      clone.style.opacity = 0.5;
    }, 50);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 800);
  };

  
  // Fetch products
  useEffect(() => {
    fetch("our-store-server-production-087e.up.railway.app/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo">🛍️ Our Store</div>
        
        <div className="nav-links">
          <Link to="/orders">📝 Order-History</Link>
          <Link to="/contact">📞 Contact</Link>

          <div className="theme-switch">
            <span>{themeOn ? "Dark" : "Light"}</span>
            <button
              className={`switch-toggle ${themeOn ? "on" : ""}`}
              onClick={() => setThemeOn((prev) => !prev)}
              aria-label="Toggle theme"
            >
              <span className="switch-handle" />
            </button>
          </div>

          <Link to="/cart" className="cart-icon" id="cart-icon">
            🛒 ({cart.length})
          </Link>
        </div>

        <div className="navbar-categories">
          <div className="category-container">
            {["All", "Watch", "Shirt", "Pants", "Glasses", "Shoes"].map((cat) => (
              <button
                key={cat}
                className={`category-btn ${
                  category === cat ? "active" : ""
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">

        {/* Products  */}
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="card">
              <Link to={`/products/${p.id}`}>
                <img src={p.imageUrl} alt={p.name} />
                <h3>{p.name}</h3>
              </Link>

              <p>{p.category}</p>
              <h4>₹{p.price}</h4>

              <button onClick={(e) => {
                const img = e.target.parentElement.querySelector("img");
                if (img) {
                  animationToCart(img);
                }
                addToCart(p);
              }}
              >
                Add to Cart
              </button>

              
            </div>
          ))}         

          {/* Coming Soon Card */}
          {category !== "All" && filteredProducts.length < 3 && (
            <div className="card coming-soon">
              <h3>More {category}</h3>
              <p>Products coming soon...</p>
            </div>
          )}
        </div>
       </div> 
    </>
  );
}

export default Home;