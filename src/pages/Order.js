import React, { useMemo, useState, Fragment, useContext } from "react";

import "./Order.css"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import { UserContext } from '../contexts/UserContext';
import { AiOutlineSearch } from "react-icons/ai";


import Moment from 'moment';
const urlSearchOrder = 'http://192.168.1.7:8082/api/Order/GetListOrder/YALY1';
registerLocale('vi', vi)

const Order = () => {
  const { state, dispatch } = useContext(UserContext);
  const [site, setSite] = useState(state.site)
  const [user, setUser] = useState(state.user)
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
  return (
    <div className="order-container">
      <div className="container-bar">
        <div className="date-bar">
          <p className='date-text'>Từ ngày </p>
          <DatePicker
            className='date-picker-container'
            selected={fromDate}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            onChange={date => setFromDate(date)} />
        </div>
        <div className="date-bar">
          <p className='date-text'>Đến ngày </p>
          <DatePicker
            className='date-picker-container'
            selected={toDate}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            onChange={date => setTotDate(date)} />
        </div>
        <button className='search-button' onClick={search}>Tìm</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên khách</th>
            <th>Sản phẩm </th>
            <th>Ngày HT </th>
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
    </div>
  );
};
export default Order;

