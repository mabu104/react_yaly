import React, { useState } from 'react';
import { FaChartPie, FaClipboardList, FaHome, FaRegClipboard, FaBars, FaRegUser } from "react-icons/fa";
import { AiOutlineHome, AiOutlineAppstore, AiOutlineSkin, AiOutlinePieChart, } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import logo from '../../src/images/logo.png';

const SideBar = ({ show, mini, setState, children }) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

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
        <div className="main-sidebar">
            <div className="brand-link">
                <img src={logo} className='logo' />
                <h1 className={mini?"name name-mini":"name"}>Yaly Couture</h1>
            </div>
            {/* <div className="divider"></div> */}
            <div className={mini?"sidebar sidebar-mini":"sidebar"}>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" >
                            <div className="icon">{item.icon}</div>
                            <div className={mini?"link-text link-text-mini":"link-text"}>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
        // </div>

    );
};

export default SideBar;