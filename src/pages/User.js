
import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { FaUserAlt, FaUser, FaHome, FaPhoneAlt, FaEnvelope,FaBuilding } from "react-icons/fa";
import { UserContext } from '../contexts/UserContext';
import './User.css'
export default function User() {
  const { state, dispatch } = useContext(UserContext);
  const [site, setSite] = useState(state.site)
  const [user, setUser] = useState(state.user)
  const [logged, setLogged] = useState(true)
  const onPressLogoutButton = () => {
    setLogged(false)
    let newSate = state;
    newSate.logged = false;
    dispatch(newSate)
  }
  if (!logged) return (
    <Navigate to="/login" />
  );
  return (
    <div className='body'>
      <div className='info-avatar'>
        <FaUser className='info-avatar-icon' />
      </div>
      <div className='info-container'>
        <FaUserAlt className='info-icon' />
        <p className='info-text'>{user.name}</p>
      </div>
      <div className='info-container'>
        <FaBuilding className='info-icon' />
        <p className='info-text'>{site.name}</p>
      </div>
      <div className='info-container'>
        <FaPhoneAlt className='info-icon' />
        <p className='info-text'></p>
      </div>
      <div className='info-container'>
        <FaEnvelope className='info-icon' />
        <p className='info-text'></p>
      </div>
      <button className='logout-button' onClick={onPressLogoutButton}>Đăng xuất</button>
    </div>   
  );
}