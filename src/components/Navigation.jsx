import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Navigation() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition">
          🛒 ShopMate
        </Link>

        <div className="flex flex-wrap gap-5 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition font-medium">
            Products
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition font-medium">
            My Cart
          </Link>
          <Link to="/order" className="text-gray-700 hover:text-indigo-600 transition font-medium">
            My Orders
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="text-gray-700 hover:text-indigo-600 transition font-medium">
              Admin
            </Link>
          )}

          {user?.token ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/register" className="text-gray-700 hover:text-indigo-600 transition font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
