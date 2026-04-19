import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const products = [
  { id: 1, name: "Casio Watch", price: 1999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGfnyPDHWGhrMEz2L6N-OT1ikDyV-ZH5DJYg&s", category: "Watch" },
  { id: 2, name: "Fossil Watch", price: 7999, image: "https://th.bing.com/th/id/OIP.-FEhjZAE4mt7kNoHdH4yfAHaJb?w=207&h=264&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3", category: "Watch" },
  { id: 3, name: "Nike T-Shirt", price: 999, image: "https://th.bing.com/th/id/OIP.fOy6G7P6UrA19hmLvIDBcwHaIz?w=207&h=246&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3", category: "Shirt" },
  { id: 4, name: "Adidas T-Shirt", price: 1299, image: "https://th.bing.com/th/id/OIP.d-e-pAogehADtWHeagOE0QHaJ4?w=207&h=276&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3", category: "Shirt" },
  { id: 5, name: "Levi's Jeans", price: 2999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTIRVq2bqWAtZRxVYi0zn-R0xeEoFRUmkcg&s", category: "Pants" },
  { id: 6, name: "Zara Pants", price: 2499, image: "https://th.bing.com/th/id/OIP.EtE8KoT-psoF7yqygqKNuQAAAA?w=123&h=184&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3", category: "Pants" },
  { id: 7, name: "Ray-Ban Glasses", price: 4999, image: "https://th.bing.com/th/id/OIP.tWHKToRFfqlFMfLQYAECjAHaHa?w=174&h=182&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3", category: "Glasses" },
  { id: 8, name: "Oakley Glasses", price: 3999, image: "https://tse1.explicit.bing.net/th/id/OIP.YgYjmKdh4iy9XkWO8czC9AHaJR?pid=ImgDet&w=183&h=229&c=7&dpr=2.2&o=7&rm=3", category: "Glasses" },
  { id: 9, name: "Puma Shoes", price: 2999, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Shoes" },
  { id: 10, name: "Reebok Shoes", price: 3499, image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/398846/31/sv01/fnd/IND/fmt/png/Speedcat-OG-Sneakers", category: "Shoes" }
];

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  const addToCart = () => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty ?? item.quatity ?? 1) + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          qty: 1,
          image: product.image || product.imageUrl,
        },
      ];
    });
  };

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="details-card">
        <img src={product.image} alt={product.name} />

        <div className="details-info">
          <h2>{product.name}</h2>
          <p>{product.category}</p>
          <h3>₹{product.price}</h3>

          <button onClick={addToCart} className="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;