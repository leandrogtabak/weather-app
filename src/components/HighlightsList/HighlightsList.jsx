import styles from './HighlightsList.module.css';
import HighlightsCard from '../HighlightsCard/HighlightsCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import WindArrow from '../WindArrow/WindArrow';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { weatherProvider } from '../../Helper/Context.js';

import { useContext, useEffect, useState } from 'react';

const HighlightsList = () => {
  const { currentWeather } = useContext(weatherProvider);
  const [windDeg, setWindDeg] = useState(0);
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [visibility, setVisibility] = useState('');
  const [airPressure, setAirPressure] = useState('');
  const [direction, setDirection] = useState('');

  const getDirection = (deg) => {
    if (deg > 337.5 && deg <= 22.5) {
      setDirection('N');
    } else if (deg > 22.5 && deg <= 67.5) {
      setDirection('NE');
    } else if (deg > 67.5 && deg <= 112.5) {
      setDirection('E');
    } else if (deg > 112.5 && deg <= 157.5) {
      setDirection('SE');
    } else if (deg > 157.5 && deg <= 202.5) {
      setDirection('S');
    } else if (deg > 202.5 && deg <= 247.5) {
      setDirection('SW');
    } else if (deg > 247.5 && deg <= 292.5) {
      setDirection('W');
    } else {
      setDirection('NE');
    }
  };

  const SPACE = String.fromCharCode(160);

  useEffect(() => {
    if (currentWeather) {
      setWindDeg(currentWeather.wind.deg);
      getDirection(currentWeather.wind.deg);
      setWindSpeed((Math.round(currentWeather.wind.speed * 2.23694 * 100) / 100).toFixed(2));
      setHumidity(currentWeather.main.humidity);
      setVisibility((Math.round(currentWeather.visibility * 0.000621371 * 100) / 100).toFixed(2));
      setAirPressure(currentWeather.main.pressure);
    } else {
      //ver de poner un loader
    }
  }, [currentWeather]);

  return currentWeather !== null ? (
    <>
      <h1 className={styles.title}>Today's Highlights</h1>
      <div className={styles.container}>
        <HighlightsCard title='Wind status' value={windSpeed} unit='mph'>
          <WindArrow grados={windDeg} direction={direction} />
        </HighlightsCard>
        <HighlightsCard title='Humidity' value={humidity} unit='%'>
          <ProgressBar percentage={humidity} />
        </HighlightsCard>
        <HighlightsCard title='Visibility' value={`${visibility}${SPACE}`} unit='miles'></HighlightsCard>
        <HighlightsCard title='Air Pressure' value={`${airPressure}${SPACE}`} unit='hPa'></HighlightsCard>
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default HighlightsList;
