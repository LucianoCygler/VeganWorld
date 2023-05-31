import React, { useEffect } from "react";
import { Chart as ChartJs, CategoryScale, PointElement, RadialLinearScale, ArcElement, LineElement, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, PolarArea, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Button } from "@mui/material";
import { Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actions/actions";

ChartJs.register( CategoryScale, PointElement, LineElement, RadialLinearScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend );

export const labels = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

/* USUARIOS */

export const optionsLine = {
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
      data: [15, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderWidth: 1,
    }
  ]
}

/* GANANCIAS */

export const optionsBox = {
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
const totalMonthAmount = [];

export const dataBox = {
  labels,
  datasets: [
    {
      label: "Total profit",
      data: totalMonthAmount,
      backgroundColor: "rgba(255, 99, 132, 0.5"
    }
  ]
}


export default function Graficos() {
  const dispatch = useDispatch();
  const importe = useSelector((state) => state.allOrders);
  const totalImport = importe.map((order) => Number(order.importe));
  const sumImport = totalImport.reduce((total, imp) => total + imp, 0);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleClick = () => {
    totalMonthAmount.push(sumImport);
  }

  return (
    <Grid container spacing={2} >
      <Grid sm={12} xs={12} md={10} lg={10} p={2} sx={{ minHeight: [200, 300, 400, 600] }}>
        <Box display={"flex"} justifyContent={"flex-end"} marginLeft={"50px"} sx={{ minHeight: [200, 300, 400, 600] } }>
          <Bar options={optionsBox} data={dataBox} responsive={true} maintainAspectRatio={false} />
          <Box display={"flex"} flexDirection={"column"} position={"relative"} left={"100px"}>
            <Text>Actualy amount:</Text>
            <Text display={"flex"}>${sumImport}</Text>
            <Button onClick={handleClick}>Send Import</Button>
          </Box>
        </Box>
      </Grid>
      <Grid sm={12} xs={12} md={6} lg={6} sx={{ minHeight: [200, 300, 400, 600] }}>
        <Line options={optionsLine} data={dataLine} responsive={true} maintainAspectRatio={false} height={"250px"} />
      </Grid>
      <Grid sm={12} xs={12} md={6} lg={6} sx={{ minHeight: [200, 300, 400, 600] }}>
        <PolarArea options={optionsRadar} data={dataRadar} responsive={true} maintainAspectRatio={false} />
      </Grid>
    </Grid>
  )
}
