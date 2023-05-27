import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import styles from "./PruebaGrafico.module.css";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Ganancias"
    }
  }
}

export const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: "Monthly earnings",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000000})),
      backgroundColor: "rgba(255, 99, 132, 0.5"
    }
  ]
}

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Users register'
    }
  }
};

export const dataLine = {
  labels,
  datasets: [
    {
      label: 'Users',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
};

function PruebaGrafico() {
  
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Bar options={options} data={data} /> 
          <Line options={optionsLine} data={dataLine} />
        </div>
      </div>
  );
}

export default PruebaGrafico;
