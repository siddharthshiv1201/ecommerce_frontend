import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const { cart, setCart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const limit = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/all?page=${page}&limit=${limit}`);
        setProducts(res.data.products);
        setTotalPages(res.data.total || 1);
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      }
    };
    fetchProducts();
  }, [page]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Trigger Popup
    setPopupText(`✅ "${product.productName}" added to cart!`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Explore Our Products</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border p-4 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={`${API_URL}/images/${product.imgUrl}`}
              alt={product.productName}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold text-indigo-800 mb-1">{product.productName}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-green-600 font-semibold text-lg">₹{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition-transform transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-800 text-lg font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Next
        </button>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-100 text-green-800 font-semibold px-6 py-3 rounded-lg shadow-lg animate-bounce z-50 transition">
          {popupText}
        </div>
      )}
    </div>
  );
}
