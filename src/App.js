import React, { useEffect, useState, useContext, createContext, Navigate } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Catalogue from "./pages/Catalogue";
import Dashboard from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import { Layout } from "./pages/Layout";
import User from "./pages/User";
//import { Logged } from './pages/UserDetails';
//export const UserContext = createContext();
function App() {
  const [state, dispatch] = useState({
    userName: '',
    password: '',
    logged: false,
    user: { user: '', no: '', recSeller: 0, status: 0 },
    site: { code: '', recShop: 0, name: '' }
  });
  return (

    <Router>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router >

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default App;


