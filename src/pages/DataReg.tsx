import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, CssBaseline, Typography, IconButton, Box, Tab, Tabs } from "@mui/material";
import Switch from '@mui/material/Switch';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { useGetRegistersByCriteriaQuery } from "../slices/registerApiSlice";

const DataReg: FunctionComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filterByType, setFilterByType] = useState('Spent');
  const [isVisible, setIsVisible] = useState(false);
  
  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);
  
  const { data: dataResponseRegisters } = useGetRegistersByCriteriaQuery({
    data: {
      idUsuario: userId,
    },
    token: token,
  });

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const years = Array.from({ length: 3 }, (_: any, i: number) => currentYear - 1 + i);
  const allDates = years.map((year: any) => months.map((month) => `${month} ${year}`)).flat();

  type Record = {
    _id: string;
    tipoRegistro: string;
    descRegistro: string;
    fecha: string;
    monto: number;
  };

  function filterRecordsByMonthAndYear(records: any[], targetMonth: number, targetYear: number) {
    if (!records) {
      return [];
    }
    return records.filter((record) => {
      const recordDate = new Date(record.fecha);
      const recordMonth = recordDate.getMonth();
      const recordYear = recordDate.getFullYear();
      return recordMonth === targetMonth && recordYear === targetYear;
    });
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const handleNextDate = () => {
    const currentIndex = allDates.indexOf(`${months[currentMonth]} ${currentYear}`);
    if (currentIndex < allDates.length - 1) {
      const [selectedMonth, selectedYear] = allDates[currentIndex + 1].split(" ");
      setCurrentMonth(months.indexOf(selectedMonth));
      setCurrentYear(Number(selectedYear));
    }
  };

  const handlePreviousDate = () => {
    const currentIndex = allDates.indexOf(`${months[currentMonth]} ${currentYear}`);
    if (currentIndex > 0) {
      const [selectedMonth, selectedYear] = allDates[currentIndex - 1].split(" ");
      setCurrentMonth(months.indexOf(selectedMonth));
      setCurrentYear(Number(selectedYear));
    }
  };

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    const [selectedMonth, selectedYear] = allDates[newValue].split(" ");
    setCurrentMonth(months.indexOf(selectedMonth));
    setCurrentYear(Number(selectedYear));
  };

  let sumaDeValores = 0;
  if (dataResponseRegisters) {
    sumaDeValores = dataResponseRegisters.reduce((total: any, item: { monto: any }) => total + item.monto, 0);
  }

  const registrosDelMesSeleccionado = filterRecordsByMonthAndYear(dataResponseRegisters, currentMonth, currentYear);
  const tipoColores: { [key: string]: string } = {};
  registrosDelMesSeleccionado.forEach((registro: Record) => {
    if (!tipoColores[registro.descRegistro]) {
      tipoColores[registro.descRegistro] = getRandomColor();
    }
  });

  const tipoFiltrado = filterByType === 'All' ? registrosDelMesSeleccionado : registrosDelMesSeleccionado.filter((registro) => registro.tipoRegistro === filterByType);
  let sumaDeValoresDelMes = 0;
  if (tipoFiltrado) {
    sumaDeValoresDelMes = tipoFiltrado.reduce((total: any, item: { monto: any }) => total + item.monto, 0);
  }

  const pieChartData = tipoFiltrado.reduce((result, item) => {
    const existingItem = result.find((x: { descRegistro: any; }) => x.descRegistro === item.descRegistro);
    if (existingItem) {
      existingItem.value += item.monto;
    } else {
      result.push({
        value: item.monto,
        descRegistro: item.descRegistro,
        fill: tipoColores[item.descRegistro],
      });
    }
    return result;
  }, []);

  return (
    <Container component="main" maxWidth="xs" className={`fade-in-vertical ${isVisible ? 'active' : ''} common-styles`}>
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Data
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ShoppingCartIcon />
          <Switch
            checked={filterByType === 'Income'}
            onChange={(event) => setFilterByType(event.target.checked ? 'Income' : 'Spent')}
            color="primary"
            inputProps={{ 'aria-label': 'toggle type filter' }}
          />
          <PaidIcon />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={handlePreviousDate}>
            <ArrowBackIcon />
          </IconButton>
          <Tabs
            value={allDates.indexOf(`${months[currentMonth]} ${currentYear}`)}
            onChange={handleTabClick}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {allDates.map((date, index) => (
              <Tab key={date} label={date} value={index} style={{ width: "100%" }} />
            ))}
          </Tabs>
          <IconButton onClick={handleNextDate}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Typography variant="h6">
          Total Month: {sumaDeValoresDelMes}
        </Typography>
        {tipoFiltrado.length > 0 && (
          <PieChart
            series={[
              {
                data: pieChartData.map((item: { value: any; descRegistro: any; fill: any; }, index: any) => ({
                  id: index,
                  value: item.value,
                  label: item.descRegistro,
                  fill: item.fill,
                })),
              },
            ]}
            width={400}
            height={200}
          />
        )}
        <form></form>
      </div>
    </Container>
  );
};

export default DataReg;