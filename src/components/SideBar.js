import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaTshirt,
    FaThList,
    FaRegUser
} from "react-icons/fa";
import {
    AiOutlineHome,
    AiOutlineAppstore,
    AiOutlineSkin,
    AiOutlinePieChart,
} from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import logo from '../../src/images/logo.png';

const SideBar = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const menuItem = [
        {
            path: "/",
            name: "Trang chủ",
            icon: <AiOutlineHome />
        },
        {
            path: "/order",
            name: "Đơn hàng",
            icon: <AiOutlineAppstore />
        },
        {
            path: "/catalogue",
            name: "Catalogue",
            icon: <AiOutlineSkin />
        },
        {
            path: "/dashboard",
            name: "Báo cáo",
            icon: <AiOutlinePieChart />
        },

        {
            path: "/user",
            name: "Tài khoản",
            icon: <FaRegUser />
        },

    ]
    return (
        // <div className='body-container'>
        //     <div className='app-bar'>
        //         <img src={logo} className='logo-app-bar' />
        //         <h1 className="name-app-bar">Yaly Couture</h1>
        //     </div>
        <div className="sidebar_container">
            <div className="sidebar">
                <div className="top_section">
                    <img src={logo} className='logo' />
                    <h1 className="name">Yaly Couture</h1>
                    <div style={{ marginLeft: sidebar ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={showSidebar} />
                    </div>
                </div>
                <div className="divider"></div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" >
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
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