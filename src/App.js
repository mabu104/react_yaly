import React, { useEffect, useState, useContext, createContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Blog } from "./pages/Blog";
import SideBar from './components/SideBar';
import NavBar from "./components/NavBar";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "./App.css";
import { UserContext } from "./contexts/UserContext";
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
      <SideBar children={null} >
        {/* <NavBar /> */}
        {/* <div className="pages"> */}
        <UserContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserContext.Provider>
        {/* </div> */}
      </SideBar>
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


