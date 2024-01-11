import routes from '../../constants/routes'

export enum ROLE {
  USER_ADMIN = 'user_admin',
  TRANSPORT_ADMIN = 'transport_admin',
  ACCOMMODATION_ADMIN = 'accommodation_admin',
}

export const roleDefaultRoutes = {
  [ROLE.USER_ADMIN]: routes.USERS,
  [ROLE.TRANSPORT_ADMIN]: routes.TRANSPORT_COMPANIES,
  [ROLE.ACCOMMODATION_ADMIN]: routes.ACCOMMODATION,
}

export type TUserData = {
  firstName: string
  lastName: string
  email: string
  role: ROLE
}

export type TLoginData = {
  email: string
  password: string
}
