import React, { useState,useEffect } from 'react'
import { Text, View, Button, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import logo from '../../src/images/logo_yaly.png';
import { useNavigate } from 'react-router-dom'
import Sites from './sites'

const urlLogin = 'http://192.168.1.7:8082/api/Users/Login'
const urlSite = 'http://192.168.1.7:8082/api/sites/GetListSite/YALY1'

export default function Login() {
  const navigate = useNavigate()
  const goToHomePage = () => {
    navigate('home',)
  }
  const [loading, setLoading] = useState(false)
  const [user, onChangeUsername] = useState('')
  const [password, onChangePassword] = useState('')
  const [sites, setSites] = useState([])

  const onPressButton = () => postData()
  // const getVersion = async () => {
  //   try {
  //     const response = await fetch('http://192.168.1.7:8082/api/yalyapp/GetVersion/YALY1/MOBILE', {
  //       method: 'GET',
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //         "Accept": "application/json",
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //     })
  //     let json = await response.json()
  //     console.log(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const postData = async () => {
    if (user == '') return;
    if (password == '') return;
    var users = user.split('@');
    if (users.length < 2) return
    var list = users[1].split('.')
    var site = list[0].toUpperCase()
    setLoading(true)
    try {
      let dt = { "No_": users[0], "Password": getFullName(password), "Site": site };
      //console.log(dt);
      const response = await fetch(urlLogin, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //"Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(dt)
      });
      let json = await response.json();
      setLoading(false)
      if (response.status == 200) {
        console.log(json);
        console.log(json.no_);
        console.log(json.rec_Seller);
        goToHomePage();
        //const nv = JSON.parse(json).data
        // console.log(nv);
        // console.log(nv);
        //console.log(nv[0].rec_Seller)
      }

    } catch (error) {
      setLoading(false)
      //alert('Đăng nhập không thành công')
      console.error(error);
    }
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
    setLoading(true)
    try {
      const response = await fetch(urlSite)
      const result = await response.json()
     // console.log(result)
      setLoading(false)
      setSites(result)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchSites()
  }, [])

  // if (loading) {
  //   return (
  //     <main>
  //       <div className="loading">
  //         <h1>loading...</h1>
  //       </div>
  //     </main>
  //   )
  // }
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
        value={user}
        //placeholderTextColor="#aaa"
        placeholder='Tài khoản' 
        />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry
        placeholder="Mật khẩu"
        //placeholderTextColor={'#aaa'}
      />
      {/* <Sites sites={sites}  /> */}

      <TouchableOpacity style={[{ marginTop: 60, width: 320, }]} onPress={onPressButton}>
        <Text style={styles.buttonText}>
          Đăng Nhập
        </Text>
      </TouchableOpacity>
      {/* <h2>reminder project setup</h2> */}
    </View>


  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    // borderColor: '#777',
    fontFamily: 'Roboto',
    fontSize: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 8,
    height: 50,
    width: 320,
    borderWidth: 1,
    // alignItems:'center'
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    //backgroundColor: '#ffa'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f17434'
  },
});
