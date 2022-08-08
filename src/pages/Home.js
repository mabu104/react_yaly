import React, { useState, useEffect, useContext, useMemo } from 'react'
import "./Home.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi)

export const Home = () => {
  const [name, onChangeName] = useState('')
  const handleChange = event => {
    onChangeName(event.target.value);
  };
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());
  const [value, setValue] = React.useState('fruit');
  return (
    <div className='App'>
      <div className='input-container'>
        <a>Home dfg</a>
        <span style={{ display: "block", width: 10 }}></span>
        <input className='text-input'
          type="text"
          placeholder="Mật khẩu"
          value={name}
          onChange={handleChange}
        //onInput={e => onChangeName(e.target.value)}
        />
        <span style={{ display: "block", width: 10 }}></span>
        <DatePicker
          className='date-picker-container'
          selected={fromDate}
          locale="vi"
          dateFormat="dd/MM/yyyy HH:mm:ss"
          showTimeSelect
          onChange={date => setFromDate(date)} />
        <span style={{ display: "block", width: 10 }}></span>
        <DatePicker selected={toDate}
          locale="vi"
          dateFormat="dd/MM/yyyy"
          onChange={date => setTotDate(date)} />
        <select value={value} onChange={event => setValue(event.target.value)}>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="meat">Meat</option>
        </select>
        <h6>{value}</h6>
      </div>

    </div>
  );
};
