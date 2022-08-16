import React, { useContext, useState, useMemo } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar';
import { UserContext } from '../contexts/UserContext';
import {
  FaBars
} from "react-icons/fa";

import "./Layout.css"

export const Layout = () => {
  const { state, dispatch } = useContext(UserContext);
  const [logged, setLogged] = useState(state.logged)
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
 
  return (
    (!logged) ? <Navigate to="/login" replace={true} /> :
      <div className="layout-container">
        <SideBar />
        <div className="body-container">
          <div className="appBar">
            <FaBars className="icon-menu"></FaBars>
            <h1 className="name-bar">Yaly Couture</h1>
            <div/>
          </div>

          <Outlet />
        </div>
      </div>
  );
};
