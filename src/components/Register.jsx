import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const API_URL=import.meta.env.VITE_API_URL
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url=`${API_URL}/api/users/register`;
      const res = await axios.post(url, formData);
      console.log('Server response:', res.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Something went wrong!');
    }

    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <center><h2>Register</h2></center> 
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
