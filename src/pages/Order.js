import React, { useMemo, useState, Fragment, useContext } from "react";
import Table from 'react-bootstrap/Table';
import "./Order.css"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import { UserContext } from '../contexts/UserContext';
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegCalendarAlt,FaEdit } from "react-icons/fa"
// import daterangepicker from "../plugins/daterangepicker/daterangepicker";
//import "../plugins/daterangepicker/daterangepicker.css";
// import $ from 'jquery';
import axios from '../utils/request';
import Moment from "moment";

const urlSearchOrder = 'http://192.168.1.7:8082/api/Order/GetListOrder/YALY1';
registerLocale('vi', vi)

const Order = () => {
  const { state, dispatch } = useContext(UserContext);
  const [site, setSite] = useState(state.site)
  const [user, setUser] = useState(state.user)
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());


  const changeDateRange = (dates) => {
    const [startDate, endDate] = dates;
    setFromDate(startDate)
    setTotDate(endDate)
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
      const response = await axios.post(urlSearchOrder, dt);
      if (response.status == 200) {
        let json = response.data;
        setData(json)
      }
      // const response = await fetch(urlSearchOrder, {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     //"Access-Control-Allow-Origin": "*"
      //   },
      //   body: JSON.stringify(dt)
      // });
      // let json = await response.json();
      // if (response.status == 200) {
      //   setData(json)
      // }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="order-container">
      <div className="input-group">
        <div className="input-group-prepend">
          <FaRegCalendarAlt></FaRegCalendarAlt>
        </div>
        <div ><DatePicker className='input-date'
          selected={fromDate}
          startDate={fromDate}
          endDate={toDate}
          selectsRange
          locale="vi"
          dateFormat="dd/MM/yyyy"
          onChange={changeDateRange} />
        </div>
        <button className="btn" onClick={search}>T??m</button>
      </div>    
      <table>
        <thead>
          <tr>
          <th className="th-index">#</th>
            <th>M??</th>
            <th>T??n kh??ch</th>
            <th>S???n ph???m </th>
            <th>Ng??y HT </th>
            <th className="th-icon"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <tr key={contact.tickeT_CODE}>
              <td>{index+1}</td>
              <td>{contact.tickeT_CODE}</td>
              <td>{contact.customeR_NAME}</td>
              <td>{contact.producT_NAME}</td>
              <td>{Moment(contact.finisH_DATE).format('DD/MM/YYYY')}</td>
              <td><FaEdit className="td-icon"></FaEdit></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Order;
