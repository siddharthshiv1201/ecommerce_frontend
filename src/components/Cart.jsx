import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const incrementQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQty = (id) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        const newQty = item.quantity - 1;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    try {
      if (!user) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      const payload = {
        orderValue: getTotal(),
        status: "Pending",
        email: user.email,
        userId: user._id,
        items: cart.map((item) => ({
          productName: item.productName,
          price: item.price,
          qty: item.quantity,
        })),
      };

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/orders`, payload);

      console.log("Order Placed Successfully:", response.data);

      setSuccessMessage("✅ Order Placed Successfully!");
      setCart([]);

      setTimeout(() => {
        navigate("/order");
      }, 3000);

    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0 && !successMessage) {
    return <h2 className="text-center text-xl mt-10">Cart is empty!</h2>;
  }

  return (
    <div className="p-6">
      {/* Success Banner */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded text-center text-xl font-semibold mb-8 shadow-md">
          {successMessage}
        </div>
      )}

      {!successMessage && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
            My Cart
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row border p-4 rounded shadow bg-white hover:shadow-lg transition duration-300"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${item.imgUrl}`}
                  alt={item.productName}
                  className="w-32 h-32 object-cover rounded mb-4 md:mb-0 md:mr-4"
                />

                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-indigo-700">{item.productName}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-indigo-600 font-bold mt-2">
                    ${item.price} x {item.quantity} = $
                    {item.price * item.quantity}
                  </p>

                  {/* Quantity buttons */}
                  <div className="flex items-center mt-4 gap-3">
                    <button
                      onClick={() => decrementQty(item._id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
                    >
                      −
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => incrementQty(item._id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-8 text-2xl font-bold text-green-700">
            Total: ${getTotal()}
          </div>

          <div className="mt-8 text-right">
            <button
              onClick={handlePlaceOrder}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow-lg transform hover:scale-105 transition duration-300"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
 