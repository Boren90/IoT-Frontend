import { useEffect, useState } from 'react'
import './App.css'
import MeasurementChart from './components/MeasurementChart'

interface Measurement {
  id: string
  humidity: number
  temperature: number
  timestamp: string
}

function App() {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError('Kunde inte ansluta till backend')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>Laddar mätdata...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  const latestMeasurement = measurements[measurements.length - 1]

  return (
    <main>
      <h1>Mätning</h1>

      {latestMeasurement ? (
        <div>
        <section>
          <div>
            <h2>Temperatur</h2>
            <p>{latestMeasurement.temperature} °C</p>
          </div>

          <div>
            <h2>Luftfuktighet</h2>
            <p>{latestMeasurement.humidity} %</p>
          </div>

          <div>
            <h2>Senaste mätning</h2>
            <p>
              {new Date(latestMeasurement.timestamp).toLocaleString('sv-SE')}
            </p>
          </div>

          <div>
            <h2>Antal mätningar</h2>
            <p>{measurements.length}</p>
          </div>
        </section>

        <MeasurementChart measurements={measurements} />
        </div>
      ) : (
        <p>Det finns inga mätningar ännu.</p>
      )}

    </main>
  )
}

export default App