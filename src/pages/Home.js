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
      <h1>
        Home
      </h1>

    </div>
  );
};
