import routes from '../../constants/routes'

export enum ROLE {
  ROLE_PATIENT = 'ROLE_PATIENT',
  ROLE_TRANSPORT = 'ROLE_TRANSPORT',
  ROLE_ACCOMMODATION = 'ROLE_ACCOMMODATION',
}

export const roleDefaultRoutes = {
  [ROLE.ROLE_PATIENT]: routes.USERS.DASHBOARD,
  [ROLE.ROLE_TRANSPORT]: routes.TRANSPORT_COMPANIES,
  [ROLE.ROLE_ACCOMMODATION]: routes.ACCOMMODATION,
}

export type TUserData = {
  email: string
  roles: ROLE[]
}

export type TLoginData = {
  email: string
  password: string
}
