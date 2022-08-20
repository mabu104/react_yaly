import React from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Catalogue = () => {
  return (
    <div style={{
      display: "flex", justifyContent: "center"
    }}>
      <DateRangePicker      
        initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2019' }}
        
      >
        
        <input></input>
      </DateRangePicker>
    </div>
  );
};

export default Catalogue;
