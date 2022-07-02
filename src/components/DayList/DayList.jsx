import styles from './DayList.module.css';
import DayCard from '../DayCard/DayCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { useContext, useEffect } from 'react';
import { celciusToFarerenheit } from '../../services/apiCalls.js';
import { weatherProvider } from '../../Helper/Context.js';

const DayList = () => {
  const { fiveDaysForecast, daysForecast, setDaysForecast, tempUnit } = useContext(weatherProvider);

  // locationToShow && console.log(locationToShow.list[0].dt_txt.split(/[\s:]+/)[1]); //hora de la primera muestra (0)

  const max = (arrayNumbers) => {
    return arrayNumbers.reduce((a, b) => Math.max(a, b), -Infinity);
  };

  const min = (arrayNumbers) => {
    return arrayNumbers.reduce((a, b) => Math.min(a, b), Infinity);
  };

  const getTemp = (item) => {
    return Math.round(tempUnit === 'C' ? item.main.temp - 273.15 : celciusToFarerenheit(item.main.temp - 273.15));
  };

  const getDate = (increment = 0) => {
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    let resultDate = new Date();

    resultDate.setTime(resultDate.getTime() + oneDayInMillis * increment);

    const date = resultDate.toDateString().split(' ');

    return `${date[0]}, ${date[2]} ${date[1]}`;
  };

  useEffect(() => {
    if (fiveDaysForecast) {
      const FORECAST_DAYS = 5;
      const days = [];

      const myIndex = fiveDaysForecast.list.findIndex((list) => list.dt_txt.split(/[\s:]+/)[1] === '00');

      //si desde este elemento del array list, cuento 8, obtengo todos los datos de tomorrow
      // fiveDaysForecast && console.log(fiveDaysForecast.list[myIndex].main.temp - 273.15); //hora de la primera muestra (0)
      const LATEST = fiveDaysForecast.list.length; // Seteo como último elemento al que se accede (son 40 como máximo)

      for (let i = 0; i < FORECAST_DAYS; i++) {
        if (i < FORECAST_DAYS - 1) {
          days.push({
            maxTemp: max(fiveDaysForecast.list.slice(myIndex + i * 8, myIndex + (i + 1) * 8 + 1).map((item) => getTemp(item))),
            minTemp: min(fiveDaysForecast.list.slice(myIndex + i * 8, myIndex + (i + 1) * 8 + 1).map((item) => getTemp(item))),
            image: fiveDaysForecast.list.slice(myIndex + i * 8, myIndex + (i + 1) * 8 + 1)[4].weather[0].icon,
            date: getDate(i + 1),
          });
        } else {
          days.push({
            maxTemp: max(fiveDaysForecast.list.slice(LATEST - 9, LATEST).map((item) => getTemp(item))),
            minTemp: min(fiveDaysForecast.list.slice(LATEST - 9, LATEST).map((item) => getTemp(item))),
            image: fiveDaysForecast.list.slice(LATEST - 9, LATEST)[4].weather[0].icon,
            date: getDate(i + 1),
          });
        }
      }

      setDaysForecast(days);
    }
  }, [fiveDaysForecast, tempUnit]);

  return daysForecast.length > 0 ? (
    <div className={styles.container}>
      {daysForecast.map((forecast, index) => (
        <DayCard
          key={index}
          day={forecast.date}
          image={`${forecast.image}.png`}
          tempMin={`${forecast.minTemp}°${tempUnit}`}
          tempMax={`${forecast.maxTemp}°${tempUnit}`}
        />
      ))}
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default DayList;
