import { useState, useEffect } from "react";
import { categories } from "../../data";
import { ProductCard } from "./components/ProductCard";
import ProductOverlay from "./components/ProductOverlay";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesRating = product.rating >= minRating;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="container mx-auto px-4 py-10">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">
          Use filters to find the perfect product.
        </p>
      </div>

      {/* Filter Panel */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-10">
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-between">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="min-w-[160px] px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="min-w-[160px] px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value={0}>All Ratings</option>
            <option value={4.5}>4.5 ★ & above</option>
            <option value={4}>4 ★ & above</option>
            <option value={3.5}>3.5 ★ & above</option>
          </select>


          <div className="flex items-center gap-2 text-sm text-gray-700">
            <label>₹</label>
            <input
              type="number"
              value={priceRange[0]}
              min={0}
              max={priceRange[1]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-20 px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              max={999999}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-20 px-2 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-600 font-medium px-2 py-1 bg-gray-100 inline-block rounded-md shadow-sm">
        {filteredProducts.length} Result
        {filteredProducts.length !== 1 && "s"} Found
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found with the selected filters.
          </p>
        )}
      </div>

      {/* Product Overlay */}
      {selectedProduct && (
        <ProductOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
