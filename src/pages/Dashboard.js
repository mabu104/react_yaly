import React, { useState } from "react";
import {
  Chart as ChartJS, ArcElement, Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title
} from 'chart.js';
import { Bar, Doughnut } from "react-chartjs-2";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./Dashboard.css"
ChartJS.register(ArcElement, CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip,
  Legend,
  Title
);
const urlSearchDashboard = 'http://192.168.1.7:8082/api/AppReport/GetListReportInComeG/YALY1'

export const Dashboard = () => {
  const [reportData, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());
  const changeDateRange = (dates) => {
    const [startDate, endDate] = dates;
    setFromDate(startDate)
    setTotDate(endDate)
  };
  const search = () => {
    fetchData()
  }
  const fetchData = async () => {
    try {
      let dt = {
        "FromDate": fromDate.toJSON(),
        "ToDate": toDate.toJSON()
      };
      const response = await fetch(urlSearchDashboard, {
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
    <div className="dashboard-container">
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
      {reportData.length == 0 ? <div /> : (<div className="chart-container">
        <div className="pie-container">
          <Doughnut
            data={{
              labels: reportData.map(item => item.shopName),
              datasets: [
                {
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#f8b250",
                    "#c45850",
                  ],
                  data: reportData.map(item => item.total),
                }
              ]
            }}
            height={400}
            width={350}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: true, position: 'top' },
                datalabels: {
                  formatter: (value, context) => {
                    const dataPoints = context.chart.data.datasets[0].data;
                    function totalSum(total, dataPoint) {
                      return total + dataPoint;
                    }
                    const totalValue = dataPoints.reduce(totalSum, 0);
                    function totalPercent() {
                      let percents = 0;
                      for (let i = 0; i < dataPoints.length - 1; i++) {
                        percents += parseFloat((dataPoints[i] / totalValue * 100).toFixed(1));
                      }
                      return parseFloat((100 - percents).toFixed(1));
                    }
                    let percentTagetValue;
                    if (value != dataPoints[dataPoints.length - 1]) {
                      percentTagetValue = (value / totalValue * 100).toFixed(1);
                    }
                    else {
                      percentTagetValue = totalPercent();

                    }
                    return `${percentTagetValue}%`;
                  },

                  //display: false,
                  color: '#ffffff'
                }
              },
              title: {
                display: false,
              }
            }}
          />
        </div>


        <Bar
          data={{
            labels: reportData.map(item => item.shopName),
            datasets: [
              {
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#f8b250",
                  "#c45850",
                ],
                data: reportData.map(item => item.total),
              }
            ]
          }}
          height={400}
          width={350}

          options={{
            responsive: false,
            plugins: {
              legend: { display: false },
              datalabels: {
                display: false
              }
            },
            title: {
              display: false,
            }
          }}
        />
      </div>)}
    </div>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  button: {
    //borderRadius: 3,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#eee',
    height: 20,
    width: 60,
    textAlign: 'center',
    marginTop: 5
  },

});