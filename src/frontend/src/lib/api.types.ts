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
  arrivalDatetime: string
  departureDatetime: string
  accommodationSize: number
  accommodationType: 'ROOM' | 'HOUSE' | 'APARTMENT'
  patientId: string
}
