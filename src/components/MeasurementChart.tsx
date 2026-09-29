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
        yAxisID: 'temperature',
        tension: 0.2,
      },
      {
        label: 'Luftfuktighet (%)',
        data: measurements.map((measurement) => measurement.humidity),
        yAxisID: 'humidity',
        tension: 0.2,
      },
    ],
  }

  const options = {
    responsive: true,

    scales: {
      temperature: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperatur (°C)',
        },
      },

      humidity: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Luftfuktighet (%)',
        },
        // Tar bort rutnätet för luftfuktighetsskalan så att det inte överlappar med temperaturens rutnät
        grid: {
          drawOnChartArea: false,
        },
      },
    },

    plugins: {
      title: {
        display: true,
        text: 'Temperatur och luftfuktighet över tid',
      },
    },
  }

  return <Line data={data} options={options} />
}

export default MeasurementChart