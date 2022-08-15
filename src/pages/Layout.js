import React, { useContext, useState, useMemo } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar';
import { UserContext } from '../contexts/UserContext';

import "./Layout.css"

export const Layout = () => {
  const { state, dispatch } = useContext(UserContext);
  const [logged, setLogged] = useState(state.logged)
  return (
    (!logged) ? <Navigate to="/login" replace={true} /> :
      <div className="layout-container">
        <SideBar />
        <Outlet />
      </div>
  );
};
