import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJs.register(
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

export default function GraficoUsuarios() {
    return (
        <Line options={optionsLine} data={dataLine} />
    )
}