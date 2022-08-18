import React, { useState } from 'react';
import { FaChartPie, FaClipboardList, FaHome, FaRegClipboard, FaBars, FaRegUser } from "react-icons/fa";
import { AiOutlineHome, AiOutlineAppstore, AiOutlineSkin, AiOutlinePieChart, } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import "./ResponsiveNav.css";
import logo from '../../src/images/logo.png';
const ResponsiveNav = ({ show,setShow }) => {
    const [showResbar, setShowResbar] = useState(false);
    const click = () => {
        setShow(false);
        setShowResbar(false);
    }

    const menuItem = [
        {
            path: "/",
            name: "Trang chủ",
            icon: <FaHome />
        },
        {
            path: "/order",
            name: "Đơn hàng",
            icon: <FaClipboardList />
        },
        {
            path: "/catalogue",
            name: "Catalogue",
            icon: <AiOutlineSkin />
        },
        {
            path: "/dashboard",
            name: "Báo cáo",
            icon: <FaChartPie />
        },

        {
            path: "/user",
            name: "Tài khoản",
            icon: <FaRegUser />
        },
    ]
    return (
        <div className={show?"main-resbar main-resbar-show":"main-resbar"}>
            <div className="brand-link-resbar" onClick={click}>
                <img src={logo} className='logo-resbar' />
                <h1 className= "name">Yaly Couture</h1>
            </div>
            <div className= "resbar">
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" onClick={click} >
                            <div className="icon">{item.icon}</div>
                            <div className= "link-text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
};

export default ResponsiveNav;