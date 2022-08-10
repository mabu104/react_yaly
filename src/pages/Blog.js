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
import { MdInsertChartOutlined } from "react-icons/md";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement,CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Tooltip,
  Legend,
  Title
);
const urlSearchDashboard = 'http://192.168.1.7:8082/api/AppReport/GetListReportInComeG/YALY1'

export const Blog = () => {
  const [reportData, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTotDate] = useState(new Date());
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
    <View style={{ alignItems: 'center',padding:5 }}>
      <View style={[{ flexDirection: 'row', marginLeft: 5}]} >
        <Text style={{ paddingTop: 5 }}>Từ ngày </Text>
        <View >
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
          <MdInsertChartOutlined style={styles.icon} />
        </TouchableOpacity>
      </View>
      {reportData.length == 0 ? <div /> : (<div >
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
          options={{
            plugins: {
              legend: { display: true },
              datalabels: {
                formatter: (value, context) =>{
                  const dataPoints=context.chart.data.datasets[0].data;
                  function totalSum(total,dataPoint){
                    return total+dataPoint;
                  }
                  const totalValue=dataPoints.reduce(totalSum,0);
                  const percentTagetValue=(value/totalValue*100).toFixed(1);
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
          width={500}

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

    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "#565d94",
    height: 25,
    width: 25,
    marginLeft: 5
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