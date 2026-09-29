import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Measurement {
  humidity: number
  temperature: number
  timestamp: string
}

interface MeasurementChartProps {
  measurements: Measurement[]
}

function MeasurementChart({ measurements }: MeasurementChartProps) {
  const data = {
    labels: measurements.map((measurement) =>
      new Date(measurement.timestamp).toLocaleTimeString('sv-SE')
    ),

    datasets: [
      {
        label: 'Temperatur (°C)',
        data: measurements.map((measurement) => measurement.temperature),
        tension: 0.2,
      },
    ],
  }

  return <Line data={data} />
}

export default MeasurementChart