import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/productService";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isAuthenticated, navigate]);

  if (loading) return <p className="details-status">Loading...</p>;

  if (!product) return <p className="details-status">Product not found</p>;

  return (
    <div>
      <Navbar />

      <div className="details-container">
        
      <img  className="details-image"
        src={product.images?.[0]}
        alt={product.title}
      />

        <div className="details-info">
          <h1 className="details-title">{product.title}</h1>

          <p className="details-description">{product.description}</p>

          <h3 className="details-price">${product.price}</h3>

          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;