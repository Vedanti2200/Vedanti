import { Star, ShoppingBag, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";

export function ProductCard({ product, onClick }) {
  const [isAdded, setIsAdded] = useState(false);
  const { dispatch } = useCart();
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} Added To Cart`);
  };

  return (
    <div
      onClick={onClick}
      className="w-full border border-gray-200 rounded-3xl bg-white hover:border-gray-400"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 p-2 rounded-3xl w-full object-cover cursor-pointer"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-md">
            <span className="text-white text-sm font-medium">Out of Stock</span>
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-xl">
            Save ₹{Math.round(product.originalPrice - product.price)}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center text-white text-xs px-3 py-1.5 rounded-lg transition-all duration-300 disabled:opacity-40 cursor-pointer ${
              isAdded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#CC7A00] hover:bg-[#FF9900]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-1" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
