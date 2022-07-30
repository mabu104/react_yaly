import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Login from "./components/login";
import Homepage from "./components/home"
import { Route,BrowserRouter as  Router,Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route  path="/"
          element={<Login />} />
        <Route  path="/home"
          element={<Homepage />} />
      </Routes>
    </Router>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default App;


