import React from "react";

import { Link } from "react-router-dom";
import { categories } from "../../data";
import CategoryCard from "./components/CategoryCard";

const Categories = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop by Category</h1>
        <p className="text-gray-600 text-lg">Explore popular categories for your everyday needs.</p>
      </div>

      <CategoryCard categories={categories} />
    </section>
  );
};

export default Categories;
