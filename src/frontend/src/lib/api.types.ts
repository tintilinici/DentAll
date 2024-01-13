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

export type JwtPayload = {
  roles: ROLE[]
  email: string
}

export type Accommodation = {
  id: string,
  accommodationType: string,
  address: string,
  availabilityStart: Date,
  availabilityEnd: Date,
  latitude: string,
  longitude: string,
}
