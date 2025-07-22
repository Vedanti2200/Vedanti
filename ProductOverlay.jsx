import { X, Star, ShoppingCart, BookOpen } from "lucide-react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const ProductOverlay = ({ product, onClose }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart 🤩`);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm transition-opacity">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Quick Preview
      </h2>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-6 overflow-y-auto max-h-[90vh] animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 md:h-80 object-contain rounded-xl bg-gray-100"
          />

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
              </h2>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-gray-400">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Specifications */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Specifications
                </h3>
                <ul className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-medium capitalize">
                        {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
                      </span>{" "}
                      {value || "—"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-5">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="mt-5 flex items-center justify-center gap-2 bg-[#CC7A00] hover:bg-[#FF9900] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition disabled:opacity-40 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                disabled={!product.inStock}
                className="mt-5 flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black border font-medium px-5 py-2.5 rounded-lg text-sm transition disabled:opacity-40 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverlay;
