import React from "react";
import { Chart as ChartJs, CategoryScale, PointElement, RadialLinearScale,
  ArcElement, LineElement, LinearScale,
  BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, PolarArea, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Box } from "@mui/material";
//.
ChartJs.register( CategoryScale, PointElement, LineElement, RadialLinearScale, 
  ArcElement, LinearScale,
  BarElement, Title, Tooltip, Legend );

export const labels = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

/* USUARIOS */

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Users register",
    },
  },
};

export const dataLine = {
  labels,
  datasets: [
    {
      label: "Users",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(55, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

/* REVIEWS */

export const optionsRadar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Users reviews"
    }
  }
}

export const dataRadar = {
  labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    }
  ]
}

/* GANANCIAS */

export const optionsBox = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly earnings",
    }
  }
}

export const dataBox = {
  labels,
  datasets: [
    {
      label: "Total profit",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5",
    }
  ]
}

export default function Graficos() {
  return (
    <Box>
      <Box width={"1000px"} marginLeft={"100px"}>
        <Bar options={optionsBox} data={dataBox} />
      </Box>
      <Box width={"600px"} display={"flex"}>
        <Line options={optionsLine} data={dataLine} height={"300px"} />
        <PolarArea options={optionsRadar} data={dataRadar} />
      </Box>
    </Box>
  )
}
