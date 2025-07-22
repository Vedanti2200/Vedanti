// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";

const API_URL = "http://localhost:4000/products";

const CategoryPage = () => {
  const { slug } = useParams(); // e.g., "electronics"
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.category.toLowerCase() === slug.toLowerCase());
        setProducts(filtered);
      });
  }, [slug]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 capitalize">{slug} Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
