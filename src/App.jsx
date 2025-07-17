import "./App.css";
import Admin from "./components/Admin";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Order from "./components/Order";
import Product from "./components/Product";
import Register from "./components/Register";
import Home from "./components/Home";
import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";

import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ cart, setCart, user, setUser }}>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
        <BrowserRouter>
          {/* Navigation Bar */}
          <Navigation />

          {/* Main Content */}
          <main className="flex-grow px-4 py-6 max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Users />} />
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </main>

          {/* Footer */}
          <footer className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mt-10">
  {/* Animated Bubbles Background */}
  <div className="absolute inset-0 -z-10">
    <div className="w-full h-full overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-ping"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  </div>

  {/* Footer Content */}
  <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
    <div>
      <h3 className="text-xl font-bold">© {new Date().getFullYear()} Siddharth Shiv</h3>
      <p className="mt-2 text-sm text-white/80">Crafted with 💙 using React & Tailwind CSS.</p>
    </div>

    <div className="md:text-right">
      <h4 className="text-lg font-semibold">Contact Me</h4>
      <ul className="mt-2 space-y-1 text-sm">
        <li>
          Email: <a href="mailto:siddharthshiv@gmail.com" className="underline hover:text-white">siddharthshiv@gmail.com</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/siddharthshiv1201" target="_blank" rel="noreferrer" className="underline hover:text-white">github.com/siddharthshiv</a>
        </li>
        {/* Add LinkedIn or Instagram here if you want */}
      </ul>
    </div>
  </div>
</footer>

        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
