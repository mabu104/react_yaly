import React, { useMemo, useState, Fragment } from "react";
import { useTable } from "react-table";
import "./About.css"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import { View, Text, StyleSheet } from "react-native";
registerLocale('vi', vi)

export const About = () => {
  const column = [{ Header: 'Id', accessor: 'id' }, { Header: 'Name', accessor: 'name' }, { Header: 'Phone', accessor: 'phone' }]
  const data = [{ "id": 1, "name": "A", "phone": "123" }, { "id": 2, "name": "B", "phone": "234" }]
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());
  return (
    <div className="app-container">
      <View style={[{ flexDirection: 'row' }]} >
        {/* <div className="row-date-picker-container"> */}
        <Text style={{ paddingTop:5 }}>Từ ngày </Text>
        <View>
          <DatePicker
            className='date-picker-container'
            selected={fromDate}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            onChange={date => setFromDate(date)} />
        </View>

        <span style={{ display: "block", width: 10 }}></span>
        <Text  style={{ paddingTop:5 }}>Đến ngày </Text>
        <View>
          <DatePicker
            className='date-picker-container'
            selected={toDate}
            locale="vi"
            dateFormat="dd/MM/yyyy"
            onChange={date => setTotDate(date)} />
        </View>

        {/* </div> */}
      </View>


      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact) => (
            <Fragment>
              <tr>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                  >
                    Edit
                  </button>
                  <button type="button">
                    Delete
                  </button>
                </td>
              </tr>
            </Fragment>

          ))}


        </tbody>
      </table>


    </div>

  );
};
const styles = StyleSheet.create({

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