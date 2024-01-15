import { PropsWithChildren } from 'react'
import { cn } from '../lib/utils'
import routes from '../constants/routes'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from './auth/useAuth'
import { ROLE } from './auth/authTypes'

interface SidebarLinkProps {
  to: string
  selected?: boolean
  className?: string
  activeOn?: string[]
  onClick?: () => void
}

const SidebarLink = (props: PropsWithChildren<SidebarLinkProps>) => {
  const { pathname } = useLocation()

  return (
    <Link
      to={props.to}
      className={cn(
        'bg-white px-10 text-lg font-normal text-gray-400',
        props.selected || pathname.startsWith(props.to)
          ? 'border-r-4 border-orange-500 font-medium text-orange-600'
          : 'hover:text-orange-400',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  )
}

type SidebarLinkMetadata = {
  visibleToRoles: ROLE[]
  to: string
  displayText: string
}
const links: SidebarLinkMetadata[] = [
  {
    visibleToRoles: [ROLE.ROLE_TRANSPORT],
    to: routes.TRANSPORT_COMPANIES,
    displayText: 'Transport Companies',
  },
  {
    visibleToRoles: [ROLE.ROLE_PATIENT],
    to: routes.USERS.DASHBOARD,
    displayText: 'Patients',
  },
  {
    visibleToRoles: [ROLE.ROLE_ACCOMMODATION],
    to: routes.USERS.ADMIN_MANAGMENT,
    displayText: 'Admin managment',
  },
  {
    visibleToRoles: [ROLE.ROLE_ACCOMMODATION],
    to: routes.ACCOMMODATION,
    displayText: 'Accommodations',
  },
]

const Sidebar = () => {
  const { getRoles, logout } = useAuth()

  return (
    <div className='flex w-72 flex-shrink-0 flex-col bg-white'>
      <h1 className='mx-auto my-8 text-4xl font-bold italic text-orange-400'>DentAll</h1>
      <hr className='border-gray-200' />
      <div className='flex h-full flex-col justify-between py-10'>
        <ul className='flex flex-col space-y-4'>
          {links.map((data) => {
            if (getRoles().some((role) => data.visibleToRoles.includes(role))) {
              return (
                <SidebarLink
                  key={data.to}
                  to={data.to}
                >
                  {data.displayText}
                </SidebarLink>
              )
            }
          })}
        </ul>
        <SidebarLink
          to='/'
          className=''
          onClick={logout}
        >
          Logout
        </SidebarLink>
      </div>
    </div>
  )
}

Sidebar.Link = SidebarLink

export default Sidebar
