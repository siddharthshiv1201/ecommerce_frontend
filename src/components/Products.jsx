import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [editId, setEditId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully!");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      setError("Product updated successfully!");
      fetchProducts();
      setEditId(null);
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2
        style={{
          color: "#4f46e5",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Product Management
      </h2>

      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "15px",
          }}
        >
          {error}
        </p>
      )}

      <form
        ref={frmRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          name="productName"
          value={form.productName}
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="description"
          value={form.description}
          type="text"
          placeholder="Description"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="price"
          value={form.price}
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="imgUrl"
          value={form.imgUrl}
          type="text"
          placeholder="Image file (e.g. 1.png)"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {editId ? (
            <>
              <button
                onClick={handleUpdate}
                style={{ ...btnStyle, backgroundColor: "#3b82f6" }}
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                type="button"
                style={{ ...btnStyle, backgroundColor: "#6b7280" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              style={{ ...btnStyle, backgroundColor: "#22c55e" }}
            >
              Add
            </button>
          )}
        </div>
      </form>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchVal(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={fetchProducts}
          style={{ ...btnStyle, backgroundColor: "#4f46e5" }}
        >
          Search
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            <th style={thTdStyle}>Product Name</th>
            <th style={thTdStyle}>Description</th>
            <th style={thTdStyle}>Price</th>
            <th style={thTdStyle}>Image</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((value) => (
            <tr key={value._id}>
              <td style={thTdStyle}>{value.productName}</td>
              <td style={thTdStyle}>{value.description}</td>
              <td style={thTdStyle}>${value.price}</td>
              <td style={thTdStyle}>
                {value.imgUrl ? (
                  <img
                    src={`/images/${value.imgUrl}`}
                    alt={value.productName}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td style={thTdStyle}>
                <button
                  onClick={() => handleEdit(value)}
                  style={{ ...btnStyle, backgroundColor: "#facc15", color: "black" }}
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDelete(value._id)}
                  style={{ ...btnStyle, backgroundColor: "#ef4444" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            ...btnStyle,
            backgroundColor: page === 1 ? "#d1d5db" : "#4f46e5",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            ...btnStyle,
            backgroundColor: page === totalPages ? "#d1d5db" : "#4f46e5",
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: "1 1 200px",
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const btnStyle = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

const thTdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};
