import { Link } from 'react-router-dom'
import { useAuth } from '../components/auth/useAuth'

const LandingPage = () => {
  const { token } = useAuth()

  return (
    <div className='h-full bg-white'>
      <div className='flex items-center justify-between px-12 py-8'>
        <ul className='flex space-x-12 text-cyan-500'>
          <Link to='/'>Home</Link>
          <Link to='/'>About</Link>
          <Link to='/'>Contact</Link>
        </ul>
        {token ? (
          <Link
            className='bg-orange-500 px-8 py-2 text-white hover:bg-orange-600 hover:shadow-md'
            to={'/transport-companies'}
          >
            Go to dashboard
          </Link>
        ) : (
          <Link
            to='/login'
            className='bg-orange-500 px-8 py-2 text-white hover:bg-orange-600 hover:shadow-md'
          >
            Prijavi se
          </Link>
        )}
      </div>
      <h1 className='pt-28 text-center text-9xl italic text-cyan-500'>DentAll</h1>
    </div>
  )
}

export default LandingPage
