//Function to filter by key a json that contains all cities with their codes

export async function callFetchCity(key) {
  //genero una lista de cada key que ingresa el usuario en la caja de busqueda
  const listKeys = key
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .split(/\s+/);

  const dato = await fetch('https://raw.githubusercontent.com/leandrogtabak/weather-app/a288510e868506b5717185a24fb099676c52f7e6/public/city.list.json')
    .then((response) => response.json())
    .then((data) =>
      data.filter((item) => {
        let test = true;
        for (const key of listKeys) {
          test = item.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(key);
          if (!test) break;
        }
        return test;
      })
    )
    .then((data) => {
      return [...new Map(data.map((item) => [item.name, item])).values()].slice(0, 8);
    });

  return dato;
}

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
