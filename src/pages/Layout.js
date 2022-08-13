import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from "./About";
import { Contact } from "./Contact";
import { Blog } from "./Blog"; 
import { User } from "./User"; 
import SideBar from '../components/SideBar';

import { Home } from "./Home";

export const Layout = () => {
  return (
    <SideBar  >
    <Routes>
    <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/user" element={<User />} />
    </Routes>
</SideBar>
  );
};
