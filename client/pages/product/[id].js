import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { Spinner } from "react-bootstrap";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data } = await apiClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : product ? (
        <div className="d-flex flex-column align-items-center">
          <div
            className="card shadow-lg p-4"
            style={{ maxWidth: "800px", width: "100%" }}
          >
            <div className="row g-0">
              {/* Image Section */}
              <div className="col-md-6 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "350px", objectFit: "contain" }}
                />
              </div>

              {/* Details Section */}
              <div className="col-md-6 d-flex flex-column justify-content-center p-4">
                <h2 className="text-primary">{product.name}</h2>
                <h4 className="text-success">₹{product.price}</h4>
                <p className="text-muted">{product.category}</p>
                <p>{product.description}</p>
                <p className="text-secondary">Stock: {product.stock}</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => router.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
