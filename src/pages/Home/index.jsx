import { useEffect, useState ,useMemo  } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    }

    fetchData();
  }, []);

  const safeProducts = Array.isArray(products) ? products : [];


  const categories = [
    ...new Set(safeProducts.map(p => p.category?.name).filter(Boolean))
  ];

  const filteredProducts = useMemo(() => {

  console.log("Filtering products...");

  let result = [...safeProducts]
    .filter(product =>
      product.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(product =>
      category
        ? product.category?.name === category
        : true
    );


  if (sort === "low") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    result.sort((a, b) => b.price - a.price);
  }


  return result;

}, [products, search, category, sort]);

  const handleView = (id) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Navbar />

      <div className="shop-layout">

        <aside className="sidebar">
          <h3>Filters</h3>

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </aside>

         

      
        <main className="products-area">
          <section id="about" className="about">
            <h1>About Us</h1>
            <p>
              Welcome to BETIY store — modern furniture & products.
            </p>
          </section>
          <section id="products"></section>
          <h2>Products</h2>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onView={handleView}
              />
            ))}
          </div>
          <section id="contact" className="contact">
            <h2>Contact Us</h2>
            <p>Email: support@betiy.com</p>
          </section>

        </main>

      </div>
    </div>
  );
}

export default Home;