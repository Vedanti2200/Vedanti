import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = total > 199 ? 0 : 50;
  const platformFees = 3;
  const finalTotal = total + shipping + platformFees;

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "CHANGE_QUANTITY", payload: { id, quantity } });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setIsLoading(true);
    toast.success("Order placed successfully!");

    setTimeout(() => {
      const order = {
        id: Math.floor(Math.random() * 1000000),
        items: cartItems,
        total: finalTotal,
        email: "user@example.com",
      };

      localStorage.setItem("lastOrder", JSON.stringify(order));
      dispatch({ type: "CLEAR_CART" });
      navigate("/confirmation", { state: { order } });
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container min-h-[75vh] flex flex-col justify-center items-center mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added any items yet.
        </p>
        <Link to="/products">
          <button className="px-5 py-2 bg-black text-white rounded-md inline-flex items-center gap-2 cursor-pointer">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container min-h-[75vh] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-md"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 border rounded flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 border rounded flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fees</span>
                <span>₹{platformFees}</span>
              </div>

              {shipping === 0 ? (
                <p className="text-xs text-green-600 mt-1">
                  🎉 You got free shipping!
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Add ₹{(200 - total).toFixed(0)} more to get free shipping
                </p>
              )}
            </div>

            <hr className="my-2" />

            {/* Name and Address Inputs */}
            <div className="space-y-3 text-sm">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rishabh Gokhe"
                  className="w-full mt-1 px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="font-medium">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder="Enter Your Address"
                  className="w-full mt-1 px-3 py-2 border rounded"
                ></textarea>
              </div>
              <div>
                <label className="font-medium">Payment</label>
                <p className="mt-1 text-green-700">Cash on Delivery</p>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white px-4 py-2 rounded-md mt-3 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Proceed to Checkout"}
            </button>

            <Link to="/products">
              <button className="w-full mt-2 border border-gray-300 text-gray-800 py-2 rounded-md cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
