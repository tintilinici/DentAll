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
}

const SidebarLink = (props: PropsWithChildren<SidebarLinkProps>) => {
  const { pathname } = useLocation()

  return (
    <Link
      to={props.to}
      className={cn(
        'text-gray-400 px-10 font-normal text-lg bg-white',
        props.selected || pathname.startsWith(props.to)
          ? 'text-orange-600 font-medium border-orange-500 border-r-4'
          : 'hover:text-orange-400',
        props.className
      )}
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
  const { getRoles } = useAuth()

  return (
    <div className='bg-white w-72 flex-shrink-0 flex flex-col'>
      <h1 className='mx-auto my-8 italic text-4xl font-bold text-orange-400'>DentAll</h1>
      <hr className='border-gray-200' />
      <div className='flex flex-col justify-between h-full py-10'>
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
        >
          Logout
        </SidebarLink>
      </div>
    </div>
  )
}

Sidebar.Link = SidebarLink

export default Sidebar
