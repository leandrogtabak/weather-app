import Layout from '../components/Layout/Layout';
import DayList from '../components/DayList/DayList';
import HighlightsList from '../components/HighlightsList/HighlightsList';
import LateralMenu from '../components/LateralMenu/LateralMenu';
import Button from '../components/Button/Button';

import styles from '../styles/Home.module.css';

import { useState } from 'react';

import { weatherProvider } from '../Helper/Context.js';
import { celciusToFarerenheit, farenheitToCelcius } from '../services/apiCalls.js';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState(null);
  const [daysForecast, setDaysForecast] = useState([]);
  const [tempUnit, setTempUnit] = useState('C');

  const toFarenheit = (e) => {
    e.preventDefault();

    if (tempUnit === 'C') {
      const weatherDays = daysForecast;
      //es un array de 5 objetos q tiene tempMin y tempMax y hay q pasarlas a F a ambas
      for (const day of weatherDays) {
        day.maxTemp = Math.round(celciusToFarerenheit(day.maxTemp));
        day.minTemp = Math.round(celciusToFarerenheit(day.minTemp));
      }

      setTempUnit('F');
      setDaysForecast(weatherDays);
    }
  };

  const toCelcius = (e) => {
    e.preventDefault();

    if (tempUnit === 'F') {
      const weatherDays = daysForecast;
      //es un array de 5 objetos q tiene tempMin y tempMax y hay q pasarlas a F a ambas
      for (const day of weatherDays) {
        day.maxTemp = Math.round(farenheitToCelcius(day.maxTemp));
        day.minTemp = Math.round(farenheitToCelcius(day.minTemp));
      }

      setTempUnit('C');
      setDaysForecast(weatherDays);
    }
  };

  return (
    <weatherProvider.Provider
      value={{ daysForecast, setDaysForecast, currentWeather, setCurrentWeather, fiveDaysForecast, setFiveDaysForecast, tempUnit, setTempUnit }}
    >
      <Layout>
        <LateralMenu />
        <div className={styles.container}>
          <div className={styles.infoCards}>
            <div className={styles.buttons}>
              <Button tempUnit={tempUnit} onClick={toCelcius} label='C' />
              <Button tempUnit={tempUnit} onClick={toFarenheit} label='F' />
            </div>
            <DayList />
            <HighlightsList />
          </div>

          <footer className={styles.footer}>
            created by <a href='#'>leandrogtabak</a> - devChallenges.io
          </footer>
        </div>
      </Layout>
    </weatherProvider.Provider>
  );
}
