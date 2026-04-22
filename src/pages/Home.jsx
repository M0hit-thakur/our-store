import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../constants";
import ImageSlider from "../components/ImageSlider";

function Home({ cart, setCart, themeOn, setThemeOn }) {
  const [products,setProducts,] = useState([]);
  const [category, setCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (!cart) return; // Skip animation if cart icon is not visible
    
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
    fetch(`${API}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products");
      });
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-top">
          <div className="logo">Our Store</div>
          
          <div className="nav-links desktop-nav">
            <Link to="/orders">📝 Order-History</Link>
            <Link to="/contact">📞 Contact</Link>
            <Link to="/cart" className="cart-icon" id="cart-icon">
              🛒 ({cart.length})
            </Link>
          </div>

          <button 
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav">
            {/* Mobile menu items can be added here if needed */}
          </div>
        )}

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
      </div>

      <ImageSlider products={products} />

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

        {/* More Products Coming Soon Card */}
        <div className="coming-soon-general">
          <div className="card coming-soon">
            <h3>🚀 More Products Coming Soon!</h3>
            <p>We're constantly adding new items to our collection. Stay tuned for exciting updates!</p>
          </div>
        </div>
       </div> 
    </>
  );
}

export default Home;