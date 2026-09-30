export interface MeasurementStatistics {
  date: string
  measurementCount: number

  averageTemperature: number
  minimumTemperature: number
  maximumTemperature: number

  averageHumidity: number
  minimumHumidity: number
  maximumHumidity: number
}