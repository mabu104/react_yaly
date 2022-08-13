
import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Text, View, Button, StyleSheet, TextInput, Image, TouchableOpacity, Icon, Picker } from 'react-native';
import logo from '../../src/images/logo.png';
import { useNavigate, useLocation,Navigate } from 'react-router-dom'
import { FaUserAlt, FaUser, FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { UserContext } from '../contexts/UserContext';
import axios from '../utils/request';

const urlLogin = '/api/Users/Login'
const urlSite = '/api/sites/GetListSite/YALY1'

export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false)

  const [userName, onChangeUsername] = useState(state.userName)
  const [password, onChangePassword] = useState(state.password)
  const [logged, setLogged] = useState(state.logged)
  const [site, setSite] = useState(state.site)
  const [user, setUser] = useState(state.user)

  const [sites, setSites] = useState([])
  const [value, setValue] = useState();


  const onPressLoginButton = () => fetchLogin()
  const onPressLogoutButton = () => {
    setLogged(false)
    let newSate = state;
    newSate.logged = false;
    dispatch(newSate)
  }

  const fetchLogin = async () => {
    if (userName == '') return;
    if (password == '') return;
    var users = userName.split('@');
    if (users.length < 2) return
    var list = users[1].split('.')
    var siteCode = list[0].toUpperCase()
    setLoading(true)
    let dt = { "No_": users[0], "Password": getFullName(password), "Site": siteCode };
    try {
      const response=await axios.post(urlLogin, dt);
      let json =  response.data;
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
      
    } catch (err) {
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
    // try {
    //   const response = await fetch(urlSite)
    //   const result = await response.json()
    //   setSites(result)
    // } catch (error) {
    //   console.log(error)
    // }
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
      // <Navigate to="/home" />
      <View style={styles.body}>
        <View style={styles.infoAvatar}>
          <FaUser style={styles.infoAvatarIcon} />
        </View>
        <View style={styles.infoContainer}>
          <FaUserAlt style={styles.infoIcon} />
          <Text style={styles.infoText}>{user.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FaHome style={styles.infoIcon} />
          <Text style={styles.infoText}>{site.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FaPhoneAlt style={styles.infoIcon} />
          <Text style={styles.infoText}></Text>
        </View>
        <View style={styles.infoContainer}>
          <FaEnvelope style={styles.infoIcon} />
          <Text style={styles.infoText}></Text>
        </View>
        <TouchableOpacity style={[{ marginTop: 40, width: 320, }]} onPress={onPressLogoutButton}>
          <Text style={styles.logoutButton}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.body}>
      <View style={[{ marginBottom: 60 }]}>
        <Image
          style={{ height: 200, width: 320, resizeMode: 'contain' }}
          source={logo} />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={userName}
        //placeholderTextColor="#aaa"
        placeholder='Tài khoản'
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry
        placeholder="Mật khẩu"
        placeholderTextColor="#555"
      //placeholderTextColor={'#aaa'}
      />
      <Picker
        selectedValue={value}
        style={{ height: 50, width: 320, paddingHorizontal: 10 }}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
      >
        {sites.map((p) => (
          <Picker.Item key={p.reC_SHOP} value={p.reC_SHOP} label={p.shoP_NAME} />
        ))}

      </Picker>
      <TouchableOpacity style={[{ marginTop: 70, width: 320, }]} onPress={onPressLoginButton}>
        <Text style={styles.loginButton}>
          Đăng Nhập
        </Text>
      </TouchableOpacity>
    </View>


  );
}
const styles = StyleSheet.create({
  input: {
    // borderColor: '#777',
    fontFamily: 'Roboto',
    fontSize: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 50,
    width: 320,
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#fff'
    // alignItems:'center'
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    //backgroundColor: '#ffa'
  },
  loginButton: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f17434'
  },
  logoutButton: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#9ca3da'
  },

  infoAvatar: {
    backgroundColor: '#9ca3da',
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  infoAvatarIcon: {
    color: '#fff',
    height: 100,
    width: 100,
  },

  infoContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#ebebf5',
    height: 50,
    width: 320,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20
  },
  infoIcon: {
    color: '#9ca3da',
    height: 25,
    width: 25,
    marginRight: 10,
    marginLeft: 10
  },
  infoText: {
    //color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
    //borderRadius: 8,
    //padding: 15,
    //backgroundColor: '#f17434'
  },

});
