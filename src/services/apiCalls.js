/*Functions to obtain 3hs-5 days forecast byId and by Latitude and Longitude*/

//envolver en try catch
export async function callFetchWeatherById(id) {
  const info = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${process.env.apiKey}`).then((response) => response.json());
  return info;
}
//envolver en try catch
export async function callFetchWeatherByLatLon(lat, lon) {
  const info = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.apiKey}`).then((response) =>
    response.json()
  );
  return info;
}

/*Functions to obtain current forectast byId and by Latitude and Longitude*/

//envolver en try catch
export async function callFetchCurrentWeatherById(id) {
  const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.apiKey}`).then((response) => response.json());
  return info;
}

//envolver en try catch
export async function callFetchCurrentWeatherByLatLon(lat, lon) {
  const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.apiKey}`).then((response) =>
    response.json()
  );
  return info;
}

//Function to obtain the current position where the browser is running

export const locateCurrentPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        console.log(error.message);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      }
    );
  });

export const celciusToFarerenheit = (degCels) => {
  return 1.8 * degCels + 32;
};

export const farenheitToCelcius = (degFaren) => {
  return (degFaren - 32) / 1.8;
};
