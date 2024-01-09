import { PropsWithChildren } from 'react'
import { cn } from '../lib/utils'
import routes from '../constants/routes'
import { Link, useLocation } from 'react-router-dom'

interface SidebarLinkProps {
  to: string
  selected?: boolean
  className?: string
  activeOn?: string[]
}

const SidebarLink = (props: PropsWithChildren<SidebarLinkProps>) => {

  const {pathname} = useLocation()

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

const Sidebar = () => {
  return (
    <div className='bg-white w-72 flex flex-col'>
      <h1 className='mx-auto my-8 italic text-4xl font-bold text-orange-400'>DentAll</h1>
      <hr className='border-gray-200' />
      <div className='flex flex-col justify-between h-full py-10'>
        <ul className='flex flex-col space-y-4'>
          <SidebarLink to={routes.TRANSPORT_COMPANIES}>Prijevoznici</SidebarLink>
          <SidebarLink to={routes.USERS}>Korisnici</SidebarLink>
          <SidebarLink to={routes.ACCOMMODATION}>Smještaji</SidebarLink>
          <SidebarLink to='/profile'>Profil</SidebarLink>
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
