import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';
import LoginForm from '../adminComponent/LoginForm';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
  const {adminLogin} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {

    // -------------------------- New Code --------------------------
    try {
      await adminLogin(username, password)
      navigate("/")
    } catch (error) {
      console.error("Login failed", error);
    }

    // -------------------------- Old Code --------------------------
    // try {
    //   const response = await axios.post('http://localhost:3000/api/users/admin-login', { username, password });
    //   const { token } = response.data;

    //   // Save the token in localStorage
    //   localStorage.setItem('adminToken', token);

    //   alert('Admin login successful!');
    //   navigate('/admin/dashboard'); // Redirect to the admin dashboard
    // } catch (error) {
    //   // Display appropriate alert based on the error response
    //   if (error.response && error.response.status === 400) {
    //     alert('Invalid username or password. Please try again.');
    //   } else if (error.response && error.response.status === 403) {
    //     alert('Access denied. Only admins can log in.');
    //   } else {
    //     alert('Login failed. Please try again later.');
    //   }
    // }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center md:items-center items-start  h-[55vh]">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-4 md:mt-0">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Login</h2>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
