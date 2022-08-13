import React, { useMemo, useState, Fragment, useContext } from "react";

import "./About.css"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import { UserContext } from '../contexts/UserContext';
import { AiOutlineSearch } from "react-icons/ai";


import Moment from 'moment';
const urlSearchOrder = 'http://192.168.1.7:8082/api/Order/GetListOrder/YALY1';
registerLocale('vi', vi)

export const About = () => {
  const { state, dispatch } = useContext(UserContext);
  const [site, setSite] = useState(state.site)
  const [user, setUser] = useState(state.user)
  const [logged, setLogged] = useState(state.logged)

  const column = [{ Header: 'Id', accessor: 'id' }, { Header: 'Name', accessor: 'name' }, { Header: 'Phone', accessor: 'phone' }]
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());


  const handleClick = (id) => {
    console.log(id);
  };
  const search = () => {
    fetchSearchOrder()
  }
  const fetchSearchOrder = async () => {
    try {
      let dt = {
        "REC_SHOP": site.recShop,
        "REC_SELLER": user.recSeller,
        "TICKET_CODE": 0,
        "Merarial": 2,
        "FromDate": fromDate.toJSON(),
        "ToDate": toDate.toJSON()
      };
      const response = await fetch(urlSearchOrder, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //"Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(dt)
      });
      let json = await response.json();
      if (response.status == 200) {
        setData(json)       
      }
    } catch (e) {

    }
  }
  if(!logged){
    return(
      <div>
      <h1>Đơn hàng</h1>
    </div>
    );
  }
  return (
    <View style={[{ paddingTop: 5 }]}>
      {/* <div className="app-container"> */}
      <View style={[{ flexDirection: 'row'}]} >
        <Text style={{ paddingTop: 5 }}>Từ ngày </Text>
        <View>
          <DatePicker
            className='date-picker-container'
            selected={fromDate}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            onChange={date => setFromDate(date)} />
        </View>
        <Text style={{ paddingTop: 5 }}>Đến ngày </Text>
        <View>
          <DatePicker
            className='date-picker-container'
            selected={toDate}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            onChange={date => setTotDate(date)} />
        </View>
        <TouchableOpacity onPress={search}>
          <AiOutlineSearch style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* <View style={{border: collapse}}>
      </View> */}
      {/* <ScrollView  style={{ height: "100vh" }}> */}
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên khách</th>
              <th>Sản phẩm </th>
              <th>Ngày hoàn thành </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact, index) => (
              <tr key={contact.tickeT_CODE}>
                <td >{contact.tickeT_CODE}</td>
                <td >{contact.customeR_NAME}</td>
                <td >{contact.producT_NAME}</td>
                <td >{Moment(contact.finisH_DATE).format('DD/MM/YYYY')}</td>
                <td>
                  <button
                    onClick={() => handleClick(index)}
                   // type="button"
                  >
                    Edit
                  </button>
                  <button type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* </ScrollView> */}

      {/* </div> */}
    </View>

  );
};
const styles = StyleSheet.create({
  icon: {
    // color: '#9ca3da',
    height: 23,
    width: 23,
    paddingTop: 5,
    marginLeft: 20
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