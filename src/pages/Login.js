
import React, { useState, useContext, useMemo } from 'react'
import logo from '../../src/images/logo.png';
import { Navigate } from 'react-router-dom'
import { MdPersonOutline, MdOutlineLock } from "react-icons/md"
import { UserContext } from '../contexts/UserContext';
import axios from '../utils/request';
import './Login.css'
const urlLogin = '/api/Users/Login'
const urlSite = '/api/sites/GetListSite/YALY1'

export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [userName, onChangeUsername] = useState(state.userName)
  const [password, onChangePassword] = useState(state.password)
  // const [userName, onChangeUsername] = useState('y0017@abb.com')
  // const [password, onChangePassword] = useState('1')
  const [logged, setLogged] = useState(state.logged)
  const [site, setSite] = useState(state.site)
  const [user, setUser] = useState(state.user)

  const [sites, setSites] = useState([])
  const [value, setValue] = useState();

  const [text, setText] = useState('');


  const onPressLoginButton = () => fetchLogin()

  const fetchLogin = async () => {
    if (userName == '') {
      setText('Chưa nhập tài khoàn');
      return;
    }
    if (password == '') {
      setText('Chưa nhập mật khẩu');
      return;
    }
    var users = userName.split('@');
    if (users.length < 2) {
      setText('Tài khoản không đúng');
      return;
    }
    var list = users[1].split('.')
    var siteCode = list[0].toUpperCase()
    let dt = { "No_": users[0], "Password": getFullName(password), "Site": siteCode };
    try {
      const response = await axios.post(urlLogin, dt);
      if (response.status == 200) {
        let json = response.data;
        // if (json.status != 1) {
        //   setText('Tài khoản hoặc mật khẩu không đúng');
        //   return;
        // }
        setLogged(true)
        var u = { name: json.name, no: json.no_, recSeller: json.rec_Seller, status: json.status }
        setUser(u)
        var s = getSite(siteCode)
        setSite(s)
        dispatch({
          userName: userName,
          password: password,
          logged: true,
          site: s,
          user: u
        })
      }
      else {
        setText('Tài khoản hoặc mật khẩu không đúng');
      }


    } catch (err) {
      setText('Đăng nhập không thành công')
      console.log(err)
    }
  }
  const getSite = (siteName) => {
    for (var i = 0; i < sites.length; i++) {
      if (sites[i].siteID == siteName) {
        return { code: sites[i].siteID, id: sites[i].reC_SHOP, name: sites[i].shoP_NAME };
      }
    }
    return { code: '', id: 0, name: '' };
  }

  const getFullName = (str) => {
    var s = '';
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    var crypto = require('crypto')
    bytes = crypto.createHash('sha1').update(bytes).digest()

    for (var i = 0; i < bytes.length; ++i) {
      s += bytes[i].toString();
    }
    return s
  }

  const fetchSites = async () => {
    try {
      const response = await axios.get(urlSite);
      setSites(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  useMemo(() => {
    fetchSites()
  }, [])

  if (logged) {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <div className='login-body'>
      <img src={logo} className='login-logo' />
      <div >
        <MdPersonOutline className='icon-input' />
        <input
          className='login-input'
          type="text"
          value={userName}
          placeholder="Tài khoản"
          onChange={(e) => { onChangeUsername(e.target.value) }}>
        </input>
      </div>
      <div >
        <MdOutlineLock className='icon-input' />
        <input
          className='login-input'
          type="password"
          value={password}
          placeholder="Mật khẩu"
          onChange={(e) => { onChangePassword(e.target.value) }}>
        </input>
      </div>
      <select className='site-container' value={value} onChange={(event) => setValue(event.target.value)}>
        {sites.map((site) => (
          <option value={site.reC_SHOP} key={site.reC_SHOP}>{site.shoP_NAME}</option>
        ))}
      </select>
      <button className='login-button' onClick={onPressLoginButton}>
        Đăng nhập
      </button>
      <p className='login-text'>{text}</p>
    </div>
  );
}