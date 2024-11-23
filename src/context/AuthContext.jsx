import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosInstance';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("Logged in user:", user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the token in Axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch the user data
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/users/user');
          setUser(response.data); // Set user data (e.g., { _id, username })
        } catch (error) {
          console.error("Error fetching user data:", error);
          logout(); // Optional: log out if fetching user fails
        }
      };
      fetchUser();
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post('/api/users/login', { username, password });
      const { token, role } = res.data; // Assume the API returns a `role`
  
      // Store token and set header
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Fetch and set the user data
      const response = await axios.get('/api/users/user');
      setUser({ ...response.data, role }); // Add the role to the user data
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials or role");
    }
  };

  // -------------------------- New Code --------------------------
  const adminLogin = async (username, password) => {
    try {
      const res = await axios.post('/api/users/admin-login', { username, password });
      const { token, role } = res.data; // Assume the API returns a `role`
      
      // Store token and set header
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Fetch and set the user data
      const response = await axios.get('/api/users/user');
      setUser({ ...response.data, role: "admin" }); // Add the role to the user data
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials or role");
    }
  };
  // ----------------------------------------------------

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
