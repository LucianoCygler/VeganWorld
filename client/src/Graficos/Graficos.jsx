import React, { useEffect, useState } from "react";
import { Chart as ChartJs, CategoryScale, PointElement, RadialLinearScale, ArcElement, LineElement, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, PolarArea, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Button } from "@mui/material";
import { Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actions/actions";
import axios from "axios";

ChartJs.register(CategoryScale, PointElement, LineElement, RadialLinearScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend);

export const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//! USUARIOS !//

const storeUsersData = localStorage.getItem("datosUsuarios");
let totalUsersRegister = storeUsersData ? JSON.parse(storeUsersData) : [];

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
      data: totalUsersRegister,
      borderColor: "rgba(255, 99, 132, 0.5)",
      backgroundColor: "rgb(81, 199, 26)",
    },
  ],
};

//? REVIEWS ?//

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

//* GANANCIAS *//


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

const storedData = localStorage.getItem("datosGrafico");
let totalMonthAmount = storedData ? JSON.parse(storedData) : [];

export const dataBox = {
  labels,
  datasets: [
    {
      label: "Total profit",
      data: totalMonthAmount,
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  ]
}

export default function Graficos() {

  //* GRAFICO GANANCIA *//

  const dispatch = useDispatch();
  const importe = useSelector((state) => state.allOrders);
  const [sumImport, setSumImport] = useState(0);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    const totalImport = importe.map((order) => Number(order.importe));
    const newSumImport = totalImport.reduce((total, imp) => total + imp, 0);
    setSumImport(newSumImport);
  }, [importe]);

  const handleClick = () => {
    const storedData = localStorage.getItem("datosGrafico");
    const totalMonthAmount = storedData ? JSON.parse(storedData) : [];

    totalMonthAmount.push(sumImport);

    localStorage.setItem("datosGrafico", JSON.stringify(totalMonthAmount));
    setSumImport(0);
  }

  const handleReset = () => {
    totalMonthAmount = [];
    localStorage.removeItem("datosGrafico");
  }

  //* GRAFICO GANANCIA *//

  //! GRAFICO USUARIOS !//

  let [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios.get("/client")
      .then(response => {
        setUserCount(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClickUsers = () => {
    const storeDataUsers = localStorage.getItem("datosUsuarios");
    const totalUsersRegister = storeDataUsers ? JSON.parse(storeDataUsers) : [];

    totalUsersRegister.push(userCount);

    localStorage.setItem("datosUsuarios", JSON.stringify(totalUsersRegister));
    setUserCount = 0;
  }

  const handleResetUsers = () => {
    totalUsersRegister = [];
    localStorage.removeItem("datosUsuarios");
  }

  //! GRAFICO USUARIOS !//

  //? GRAFICO REVIEWS ?//



  return (
    <Grid container spacing={2}>
      <Grid sm={12} xs={12} md={10} lg={10} sx={{ minHeight: [200, 300, 400, 600] }}>
        <Box display={"flex"} justifyContent={"flex-end"} marginLeft={"120px"} sx={{ minHeight: [200, 300, 400, 600], fontFamily: "Montserrat" }}>
          <Bar options={optionsBox} data={dataBox} responsive={true} maintainAspectRatio={false} />
          <Box display={"flex"} flexDirection={"column"} position={"relative"} left={"100px"} gap={"15px"}>
            <Text whiteSpace={"nowrap"} color={"rgba(255, 7, 7, 0.87)"} fontFamily="Montserrat">Current amount:</Text>
            <Text display={"flex"} fontSize={"30px"} whiteSpace={"nowrap"} color={"rgb(255, 99, 132)"} fontFamily="Montserrat">${sumImport}</Text>
            <Button onClick={handleClick} variant="contained" fontFamily="Montserrat">Send amount!</Button>
            <Button onClick={handleReset} variant="contained" color="error" fontFamily="Montserrat">Reset graph</Button>
          </Box>
        </Box>
      </Grid>
      <Grid sm={12} xs={12} md={6} lg={6} sx={{ minHeight: [200, 300, 400, 600] }}>
        <Box display={"flex"} flexDirection={"column"} gap={"15px"} fontFamily="Montserrat">
          <Line options={optionsLine} data={dataLine} responsive={true} maintainAspectRatio={false} height={"250px"} />
          <Button onClick={handleClickUsers} variant="contained" fontFamily="Montserrat">Send clients!</Button>
          <Button onClick={handleResetUsers} variant="contained" color="error" fontFamily="Montserrat">Reset graph</Button>
        </Box>
      </Grid>
      <Grid sm={12} xs={12} md={6} lg={6} sx={{ minHeight: [200, 300, 400, 600] }}>
        <PolarArea options={optionsRadar} data={dataRadar} responsive={true} maintainAspectRatio={false} />
      </Grid>
    </Grid>
  )
}
