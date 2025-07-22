import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import toast from "react-hot-toast";
import { categories } from "../../data";

const API_URL = "http://localhost:4000/products";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    image: "",
    rating: "",
    reviewCount: "",
    inStock: true,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => toast.error("Failed to fetch products."));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      price: "",
      originalPrice: "",
      description: "",
      category: "",
      image: "",
      rating: "",
      reviewCount: "",
      inStock: true,
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      id: editId || uuidv4(),
      slug: slugify(form.name, { lower: true }),
      price: +form.price,
      originalPrice: +form.originalPrice,
      rating: +form.rating || 0,
      reviewCount: +form.reviewCount || 0,
      inStock: Boolean(form.inStock),
      specs: {
        processor: "",
        material: "",
        display: "",
        camera: "",
        battery: "",
      },
    };

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        toast.success("Product updated successfully!");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        toast.success("Product added successfully!");
      }

      const res = await fetch(API_URL);
      const updated = await res.json();
      setProducts(updated);
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product.");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted.");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full bg-white"
          >
            <option value="">Select Category</option>
            {categories
              .filter((cat) => cat.slug !== "all")
              .map((cat) => (
                <option key={cat.slug} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <input name="originalPrice" type="number" placeholder="Original Price" value={form.originalPrice} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <input name="rating" type="number" placeholder="Rating" value={form.rating} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <input name="reviewCount" type="number" placeholder="Review Count" value={form.reviewCount} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
            In Stock
          </label>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={3}
        />

        <button type="submit" className="bg-[#0E0E10] hover:bg-[#1c1c1f] text-white px-6 py-2 rounded text-sm transition-all">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.brand}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">₹{p.price.toLocaleString()}</td>
                <td className="px-4 py-2 space-x-3">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
