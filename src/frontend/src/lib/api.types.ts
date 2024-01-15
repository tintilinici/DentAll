import { ROLE } from '../components/auth/authTypes'

export type TransportCompanyPostDTO = {
  name: string
  email: string
  phoneNumber: number
}

export type TransportCompany = {
  id: string
  name: string
  email: string
  phoneNumber: string
  transportVehicles: TransportVehicle[]
}

export type TransportVehicle = {
  id: string
  capacity: number
  transportVehicleType: 'BUS' | 'CAR' | 'VAN'
  transportCompanyId: string
}

export type TransportVehiclePostDTO = Omit<TransportVehicle, 'id'>

export type JwtPayload = {
  roles: ROLE[]
  email: string
}

export type Accommodation = {
  id: string
  accommodationType: string
  address: string
  availabilityStart: string
  availabilityEnd: string
  latitude: string
  longitude: string
}

export type Patient = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  pin: string
}

export type PatientPostDTO = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  pin: string
}

export type AccommodationOrderPostDTO = {
  arrivalDateTime: string
  departureDateTime: string
  accommodationSize: number
  accommodationType: 'ROOM' | 'HOUSE' | 'APARTMENT'
  patientId: string
}

export type AccommodationOrder = {
  id: string
  patientId: string
  arrivalDateTime: string
  departureDateTime: string
  accommodationSize: number
  accommodationType: 'ROOM' | 'HOUSE' | 'APARTMENT'
  accommodationBookingId: string
}
