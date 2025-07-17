import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div
        className="
          max-w-5xl
          mx-auto
          bg-white
          shadow-md
          p-6
          rounded-lg
          transition
          duration-300
        "
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Admin Panel
        </h2>

        {/* Navigation */}
        <nav className="flex justify-center gap-6 mb-8 flex-wrap">
          <Link
            to="users"
            className="
              text-blue-600 
              hover:text-blue-800 
              font-medium 
              transition-colors 
              duration-200
            "
          >
            Users
          </Link>
          <Link
            to="products"
            className="
              text-blue-600 
              hover:text-blue-800 
              font-medium 
              transition-colors 
              duration-200
            "
          >
            Products
          </Link>
          <Link
            to="orders"
            className="
              text-blue-600 
              hover:text-blue-800 
              font-medium 
              transition-colors 
              duration-200
            "
          >
            Orders
          </Link>
        </nav>

        {/* Nested route content */}
        <div className="bg-gray-50 border rounded-md p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
