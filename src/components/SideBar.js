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
}from "react-icons/fa";
import {
    AiOutlineHome,
    AiOutlineAppstore,
    AiOutlineSkin,
    AiOutlinePieChart,
}from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import "./SideBar.css";

const SideBar= ({children})=> {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Trang chủ",
            icon:<AiOutlineHome/>
        },
        {
            path:"/about",
            name:"Sản phẩm",
            icon:<AiOutlineAppstore/>
        },
        {
            path:"/contact",
            name:"Catalogue",
            icon:<AiOutlineSkin/>
        },
        {
            path:"/blog",
            name:"Báo cáo",
            icon:<AiOutlinePieChart/>
        },

        {
            path:"/login",
            name:"Tài khoản",
            icon:<FaRegUser/>
        },

    ]
    return (
        <div className="sidebar_container">
           <div  className="sidebar">
               {/* <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div> */}
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default SideBar;