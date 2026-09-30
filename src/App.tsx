import { useEffect, useState } from 'react'
import './App.css'
import MeasurementChart from './components/MeasurementChart'
import type { MeasurementStatistics } from './types/MeasurementStatistics'

interface Measurement {
  id: string
  humidity: number
  temperature: number
  timestamp: string
}

function App() {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [statistics, setStatistics] = useState<MeasurementStatistics | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/humidity-temperature')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Kunde inte hämta mätdata')
        }

        return response.json()
      })
      .then((data: Measurement[]) => {
        setMeasurements(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const latestMeasurement = measurements[measurements.length - 1]

  const fetchStatistics = async () => {
    if (!selectedDate) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/humidity-temperature/statistics?date=${selectedDate}`
      )

      if (!response.ok) {
        setStatistics(null)
        return
      }

      const data: MeasurementStatistics = await response.json()

      setStatistics(data)
    } catch (error) {
      console.error('Could not fetch statistics:', error)
      setStatistics(null)
    }
  }

  const fetchDayData = async () => {
    if (!selectedDate) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/humidity-temperature/day?date=${selectedDate}`
      )

      if (!response.ok) {
        throw new Error('Kunde inte hämta dagens mätningar')
      }

      const data: Measurement[] = await response.json()

      setMeasurements(data)
    } catch (error) {
      console.error('Could not fetch day measurements:', error)
    }
  }

  return (
    <main>
      <h1>Mätning</h1>

      <section>
        <div>
          <h2>Temperatur</h2>
          {/* Visa temperaturen från den senaste mätningen om den finns, annars visa --  */}
          <p>{latestMeasurement?.temperature ?? '--'} °C</p>
        </div>

        <div>
          <h2>Luftfuktighet</h2>
          <p>{latestMeasurement?.humidity ?? '--'} %</p>
        </div>

        <div>
          <h2>Senaste mätning</h2>
          <p>
            {latestMeasurement
              ? new Date(latestMeasurement.timestamp).toLocaleString('sv-SE')
              : '--'}
          </p>
        </div>

        <div>
          <h2>Antal mätningar</h2>
          <p>{measurements.length}</p>
        </div>
      </section>

      <div>
        <h2>Välj dag</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            fetchDayData()
            fetchStatistics()
          }}
        >
          Visa dag
        </button>
      </div>

      {statistics && (
        <section>
          <h2>Statistik för {statistics.date}</h2>

          <h3>Temperatur</h3>
          <p>Medel: {statistics.averageTemperature.toFixed(1)} °C</p>
          <p>Min: {statistics.minimumTemperature.toFixed(1)} °C</p>
          <p>Max: {statistics.maximumTemperature.toFixed(1)} °C</p>

          <h3>Luftfuktighet</h3>
          <p>Medel: {statistics.averageHumidity.toFixed(1)} %</p>
          <p>Min: {statistics.minimumHumidity.toFixed(1)} %</p>
          <p>Max: {statistics.maximumHumidity.toFixed(1)} %</p>
        </section>
      )}
      {/* Ternary operator: Condition ? true:false */}
      {measurements.length > 0 ? (
        <MeasurementChart measurements={measurements} />
      ) : (
        <p>Det finns inga mätningar för den valda dagen.</p>
      )}
    </main>
  )
}

export default App