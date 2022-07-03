import { useState, useContext, useEffect } from 'react';

import styles from './LateralMenu.module.css';
import { MyLocationRounded } from '@material-ui/icons';
import { LocationOn } from '@material-ui/icons';
import SearchBox from '../SearchBox/SearchBox';
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import SelectBox from '../SelectBox/SelectBox';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { Close } from '@material-ui/icons';
import {
  callFetchCity,
  locateCurrentPosition,
  callFetchCurrentWeatherByLatLon,
  callFetchWeatherByLatLon,
  celciusToFarerenheit,
} from '../../services/apiCalls.js';
import { weatherProvider } from '../../Helper/Context.js';

const LateralMenu = () => {
  const [toggleMenus, setToggleMenus] = useState(false);
  const [locationToSearch, setLocationToSearch] = useState('');
  const [locationsFound, setLocationsFound] = useState([]);
  const [date, setDate] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const { tempUnit, currentWeather, setCurrentWeather, setFiveDaysForecast } = useContext(weatherProvider);

  useEffect(() => {
    const updateLocation = async () => {
      const position = await locateCurrentPosition();
      const weatherNow = await callFetchCurrentWeatherByLatLon(position.coords.latitude, position.coords.longitude);
      const weatherWeek = await callFetchWeatherByLatLon(position.coords.latitude, position.coords.longitude);
      setCurrentWeather(weatherNow);
      setFiveDaysForecast(weatherWeek);

      getCurrentDate();
    };

    updateLocation().catch(console.error);
  }, []);

  const onInputSearch = (e) => {
    setLocationToSearch(e);
    if (e === '') {
      setLocationsFound([]);
    }
  };

  const onClickSearch = async () => {
    setShowLoader(true);
    setLocationsFound(await callFetchCity(locationToSearch));
    setShowLoader(false);
  };
  const onKeyPress = async (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      setShowLoader(true);
      setLocationsFound(await callFetchCity(locationToSearch));
      setShowLoader(false);
    }
  };

  const onLocateClick = async () => {
    const position = await locateCurrentPosition();
    const weatherNow = await callFetchCurrentWeatherByLatLon(position.coords.latitude, position.coords.longitude);
    const weatherWeek = await callFetchWeatherByLatLon(position.coords.latitude, position.coords.longitude);
    setCurrentWeather(weatherNow);
    setFiveDaysForecast(weatherWeek);

    getCurrentDate();
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const date = currentDate.toDateString().split(' ');

    setDate(`${date[0]}, ${date[2]} ${date[1]}`);
  };

  // const actualTemp = (((currentWeather && currentWeather.main.temp - 273.15) * 10) / 10).toFixed(1);
  const actualTemp = (((currentWeather && currentWeather.main.temp - 273.15) * 10) / 10).toFixed(1);

  return (
    <div className={styles.parentContainer}>
      <div className={`${styles.container} ${toggleMenus && styles.containerHide}`}>
        {currentWeather !== null ? (
          <>
            <img className={styles.background} src='./Cloud-background.png' alt='' />
            <div className={styles.buttons}>
              <button className={styles.buttonSearch} onClick={() => setToggleMenus((prevState) => !prevState)}>
                Search for places
              </button>
              <button onClick={() => onLocateClick()} className={styles.buttonLocate}>
                <MyLocationRounded style={{ fontSize: '22px' }} />
              </button>
            </div>
            <img className={styles.image} src={`/${currentWeather.weather[0].icon}.png`} alt='' />
            <div className={styles.temperature}>
              <p>{Math.round(tempUnit === 'C' ? actualTemp : celciusToFarerenheit(actualTemp))}</p>
              <p>{`°${tempUnit}`}</p>
            </div>
            <p className={styles.clime}>{currentWeather.weather[0].main}</p>
            <div className={styles.date}>
              <p>Today</p>
              <p className={styles.dot}>•</p>
              <p>{date}</p>
            </div>
            <div className={styles.location}>
              <LocationOn style={{ fontSize: '22px' }} /> <p>{currentWeather.name}</p>
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      <div className={`${styles.container} ${!toggleMenus && styles.containerHide}`}>
        {/* <Close className={styles.close} onClick={() => setShowWeather((prevState) => !prevState)} /> */}
        <Close className={styles.close} onClick={() => setToggleMenus((prevState) => !prevState)} />

        <div className={styles.selectLocationContainer}>
          <div className={styles.searchBar}>
            <SearchBox onInputSearch={onInputSearch} onKeyPress={onKeyPress} />
            <ButtonSearch onClickSearch={onClickSearch} />
          </div>
          <SelectBox locations={locationsFound} />
          {showLoader && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default LateralMenu;
