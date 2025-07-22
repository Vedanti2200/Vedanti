import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brandName, categories, features, mockProducts } from "../../data";
import heroImage from "../assets/hero-main.jpg";
import CategoryCard from "./components/CategoryCard";

export default function Home() {
  const featuredProducts = mockProducts.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9F0] via-[#FFF3E0] to-[#FFF8E1] text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Discover{" "}
            <span className="bg-gradient-to-r from-white to-[#FFD699] bg-clip-text text-transparent">
              Amazing Products
            </span>
            <br />
            at <span className="text-[#FFDD99]">{brandName}</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#FFE8C2] mb-8 max-w-xl mx-auto">
            Curated to match your lifestyle, delivered with style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="min-w-[200px] px-6 py-3 text-lg font-semibold rounded-md bg-[#FF9900] hover:bg-[#e68a00] text-white flex items-center justify-center shadow transition-all"
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/categories"
              className="min-w-[200px] px-6 py-3 text-lg font-semibold rounded-md border border-white/30 text-white hover:bg-white/20 bg-white/10 transition-all"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-[#FFF3E0] via-[#FFF8E1] to-[#FFF9F0]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="space-y-4">
              <div className="w-16 h-16 bg-[#FF9900] rounded-full flex items-center justify-center mx-auto shadow-md">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-[#FFF8E1] via-[#FFF3E0] to-[#FFF9F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find what you love, organized for convenience.
            </p>
          </div>

          <div className="mb-5">
            <CategoryCard
              categories={categories
                .filter((cat) => cat.slug !== "all")
                .slice(0, 4)}
            />
          </div>

          <div className="text-center">
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 bg-[#FF9900] text-white font-semibold text-lg rounded-md hover:bg-[#e68a00] shadow transition"
            >
              Browse All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Shopperz Section
      <section className="py-20 bg-gradient-to-br from-[#FFB84D] via-[#FFA733] to-[#FF9900] text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why People Love{" "}
            <span className="text-white drop-shadow">{brandName}</span> 🧡
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            It's more than shopping. It's an experience made for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="bg-white/80 rounded-xl shadow p-6 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-2">
                🎁 Handpicked Quality
              </h3>
              <p className="text-sm text-gray-700">
                Every product is selected with care to meet high standards and
                genuine value.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl shadow p-6 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-2">
                🚚 Fast & Free Shipping
              </h3>
              <p className="text-sm text-gray-700">
                Get your orders at lightning speed — no extra cost on eligible
                purchases.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl shadow p-6 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-2">
                🛡️ Buyer Protection
              </h3>
              <p className="text-sm text-gray-700">
                Enjoy secure payments, easy returns, and peace of mind with
                every order.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl shadow p-6 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-2">
                💬 Real Human Support
              </h3>
              <p className="text-sm text-gray-700">
                Have questions? Our team is available 24/7 to help you with
                anything.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-white text-[#CC6600] font-semibold text-lg rounded-md shadow hover:bg-orange-100 transition-all"
            >
              Explore Our Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
