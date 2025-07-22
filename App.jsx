import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/components/NavBar";
import Home from "./pages/Home";
import Footer from "./pages/components/footer";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<AdminDashboard />} />{" "}
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
