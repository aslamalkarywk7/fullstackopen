import { useState, useEffect } from 'react'

import countryService from './services/countries'
import weatherService from './services/weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(capital).then((data) => {
      setWeather(data)
    })
  }, [capital])

  if (!weatherService.hasKey) {
    return <p>Weather data unavailable (no API key provided)</p>
  }

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryDetails = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital?.[0]}</p>
    <p>area {country.area}</p>
    <h4>languages:</h4>
    <ul>
      {Object.values(country.languages ?? {}).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`flag of ${country.name.common}`}
      width="150"
    />
    {country.capital?.[0] && <Weather capital={country.capital[0]} />}
  </div>
)

const CountryList = ({ countries, onShow }) => (
  <div>
    {countries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}{' '}
        <button onClick={() => onShow(country.name.common)}>show</button>
      </div>
    ))}
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  const matches =
    query === ''
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )

  let content = null
  if (query !== '' && matches.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (matches.length > 1) {
    content = <CountryList countries={matches} onShow={setQuery} />
  } else if (matches.length === 1) {
    content = <CountryDetails country={matches[0]} />
  }

  return (
    <div>
      <div>
        find countries <input value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      {content}
    </div>
  )
}

export default App
