import { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "../api/apiClient";
import { addToCart } from "@/api/cartService";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await apiClient.get("/products");
        if (data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await addToCart(productId, 1);

      if (response && response.item === "added") {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div
              className="card product-card border-0 shadow-sm"
              style={{
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.name}
                style={{
                  height: "250px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="text-danger fw-bold fs-5">₹{product.price}</p>
                <p className="text-muted small">{product.description}</p>
                <Link
                  href={`/product/${product._id}`}
                  className="btn btn-dark w-100 mb-2"
                  style={{
                    borderRadius: "6px",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#333")}
                  onMouseLeave={(e) => (e.target.style.background = "#000")}
                >
                  View Details
                </Link>
                <button
                  className="btn w-100"
                  style={{
                    background: "linear-gradient(45deg, #ff5722, #e64a19)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
