import React, { useContext, useState, useMemo,useLayoutEffect,useEffect  } from "react";
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar';
import ResponsiveNav from '../components/ResponsiveNav';
import { UserContext } from '../contexts/UserContext';
import { AiOutlineMenu } from "react-icons/ai";


import "./Layout.css"

export const Layout = () => {
  const { state, dispatch } = useContext(UserContext);
  const [logged, setLogged] = useState(state.logged)
  const [showSidebar, setShowSidebar] = useState(false);
  const [miniSidebar, setMiniSidebar] = useState(false);
  const clickMenu = () => {
    if(window.innerWidth<700) setShowSidebar(!showSidebar);
    else setMiniSidebar(!miniSidebar);
  }
  if (!logged) return <Navigate to="/login" replace={true} />;
  return (
    <div className="layout-container">
      <SideBar mini={miniSidebar}/>
      <div className="body-container">
        <a className="appBar">
          <AiOutlineMenu className="icon-menu" onClick={clickMenu}  ></AiOutlineMenu>
        </a>      
        <Outlet />
        <ResponsiveNav show={showSidebar} setShow={setShowSidebar} />
      </div>
    </div>
  );
};
