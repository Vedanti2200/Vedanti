import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order || JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
        <p className="text-gray-600">No order found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
      <p className="text-gray-600 mb-6">
        Order ID: <strong>{order.id}</strong> <br />
        Confirmation sent to: <strong>{order.email}</strong>
      </p>

      {/* Order Details */}
      <div className="bg-gray-100 rounded-lg p-4 w-full max-w-lg mb-6 text-left shadow-sm">
        <h2 className="font-semibold mb-2">Items Ordered:</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-1">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold mt-3 text-black">
          Total: ₹{order.total.toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/products">
          <button className="bg-black text-white px-6 py-2 rounded-md inline-flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </button>
        </Link>

        <Link to="/orders">
          <button className="border border-gray-300 text-gray-800 px-6 py-2 rounded-md">
            View Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
