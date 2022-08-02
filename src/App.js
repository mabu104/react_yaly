import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Login from "./components/login";
import Homepage from "./components/home"
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Blog } from "./components/Pages/Blog";
import { Contact } from "./components/Pages/Contact";
import NavBar from "./components/NavBar";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

    </Router>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default App;


