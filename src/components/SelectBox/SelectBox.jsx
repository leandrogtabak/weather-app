import styles from './SelectBox.module.css';
import { ChevronRight } from '@material-ui/icons';
import { callFetchCurrentWeatherById, callFetchWeatherById } from '../../services/apiCalls.js';
import { weatherProvider } from '../../Helper/Context.js';

import { useContext, useState, useEffect } from 'react';

const SelectBox = ({ locations }) => {
  const { setCurrentWeather, setFiveDaysForecast } = useContext(weatherProvider);
  const [showList, setShowList] = useState(true);
  const [locationSelected, setLocationSelected] = useState('');

  useEffect(() => {
    setShowList(true);
  }, [locations]);

  const getLocationInfo = async (id, location) => {
    const weatherNow = await callFetchCurrentWeatherById(id);
    const weatherWeek = await callFetchWeatherById(id);
    setCurrentWeather(weatherNow);
    setFiveDaysForecast(weatherWeek);
    setShowList(false);
    setLocationSelected(location);
    console.log(id);
  };

  return (
    <div className={styles.container}>
      {locations?.length > 0 ? (
        showList ? (
          locations.map((location) => {
            return (
              <button key={location.id} onClick={() => getLocationInfo(location.id, location)} className={styles.citySelected}>{`${location.name}, ${
                location.country
              }${location.state && ', ' + location.state}`}</button>
            );
          })
        ) : (
          <div className={styles.containerSelected}>
            <button onClick={() => getLocationInfo(locationSelected.id, locationSelected)} className={styles.citySelected}>{`${locationSelected.name}, ${
              locationSelected.country
            }${locationSelected.state && ', ' + locationSelected.state}`}</button>
            <ChevronRight className={styles.arrow} />
          </div>
        )
      ) : (
        <>
          <p className={styles.citySelected}>Search location...</p>
        </>
      )}
    </div>
  );
};

export default SelectBox;
