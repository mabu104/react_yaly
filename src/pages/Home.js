import React from 'react'
import "./Home.css";
import { Image, StyleSheet } from "react-native";

const urlImage = 'http://192.168.1.6:8081/Images/AppImg/YalyApp.png'

const Home = () => {
  return (
    <div className='home-container'>
      {/* <img className='photo' src='http://192.168.1.6:8081/Images/AppImg/YalyApp.png' alt="new" /> */}
      <Image style={style.imageStyle} source={{ uri: urlImage }}></Image>
    </div>

  );
};
export default Home;
const style = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    maxWidth: 800,
    resizeMode: 'cover',
  },
})