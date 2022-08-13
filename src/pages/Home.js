import React, { useState, useEffect, useContext, useMemo } from 'react'
import "./Home.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { About } from "./About";
import { Contact } from "./Contact";
import { Blog } from "./Blog"; 
import { User } from "./User"; 
import SideBar from '../components/SideBar';
import { Layout } from './Layout';

registerLocale('vi', vi)

export const Home = () => {
  const [name, onChangeName] = useState('')
  const handleChange = event => {
    onChangeName(event.target.value);
  };
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());
  const [value, setValue] = React.useState('fruit');
  return (
    <div className='App'>
        <img className='photo' src='http://192.168.1.6:8081/Images/AppImg/YalyApp.png' alt="new" />;
    </div>

   );
};
