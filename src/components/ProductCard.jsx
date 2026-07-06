import "../styles/ProductCard.css";

function ProductCard({ product, onView }) {
  return (
    <div className="product-card">

      <img  className="product-image"
        src={product.images?.[0]}
        alt={product.title}
      />

     <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <p className="price">${product.price}</p>

        <button className="product-view-btn" onClick={() => onView(product.id)}>
          View Details
        </button>
      </div>

    </div>
  );
}

export default ProductCard;




