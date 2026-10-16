import axios from 'axios'

// Provided via environment variable, see .env.example.
// Never commit a real key to source control.
const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = (capital) => {
  if (!apiKey) {
    return Promise.resolve(null)
  }
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
    )
    .then((response) => response.data)
}

export default { getWeather, hasKey: Boolean(apiKey) }
