import { Link } from "react-router-dom";

const CategoryCard = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {categories.map((category, idx) => (
        <Link
          key={idx}
          to={`/category/${category.slug}`}
          className="relative group h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
        >
          {/* Background Image */}
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay with Glassmorphism */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />

          {/* Category Name */}
          <h2 className="absolute inset-x-0 bottom-4 text-center text-white text-xl font-semibold z-10 drop-shadow-lg tracking-wide">
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;
