import { TransportVehicle } from '../lib/api.types'

export const getVehicleTagColor = (vehicleType: TransportVehicle['transportVehicleType']) => {
  switch (vehicleType) {
    case 'BUS':
      return 'lightblue'
    case 'CAR':
      return 'lightcoral'
    case 'VAN':
      return 'lightgreen'
    default:
      return 'purple'
  }
}
