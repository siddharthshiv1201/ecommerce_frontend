import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!user?.email) {
        setError("User not logged in!");
        return;
      }

      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  const formatCurrency = (value) => {
    return `$${Number(value).toFixed(2)}`;
  };

  const renderStatusBadge = (status) => {
    let color = "bg-gray-300 text-gray-800";
    if (status === "Pending") color = "bg-yellow-100 text-yellow-800";
    if (status === "Completed") color = "bg-green-100 text-green-800";
    if (status === "Cancelled") color = "bg-red-100 text-red-800";

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      <h3 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
        My Orders
      </h3>

      {error && (
        <p className="text-red-600 text-center text-lg font-semibold">
          {error}
        </p>
      )}

      {!orders.length && !error && (
        <p className="text-gray-500 text-center text-lg">
          You have no orders yet. Go fill your cart and shop something cool! 🛒
        </p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4">
              <div className="flex justify-between items-center flex-wrap gap-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Order ID:</span>{" "}
                  <span className="font-mono">{order._id}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Order Value:</span>{" "}
                  {formatCurrency(order.orderValue)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  {renderStatusBadge(order.status)}
                </p>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-2">Product</th>
                    <th className="text-right px-4 py-2">Price</th>
                    <th className="text-right px-4 py-2">Quantity</th>
                    <th className="text-right px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="text-right px-4 py-2">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="text-right px-4 py-2">{item.qty}</td>
                      <td className="text-right px-4 py-2">
                        {formatCurrency(item.qty * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
