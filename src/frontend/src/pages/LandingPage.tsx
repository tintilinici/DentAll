import { Link } from 'react-router-dom'
import { useAuth } from '../components/auth/useAuth'

const LandingPage = () => {
  const { token } = useAuth()

  return (
    <div className='h-full bg-white'>
      <div className='flex items-center justify-between px-12 py-8'>
        <ul className='flex space-x-24 text-cyan-500'>
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
            Sign in
          </Link>
        )}
      </div>

      <div className='dental-welcome-wrapper w-2/5'>
        <h1 className='text-black-500 mb-8 text-4xl font-bold'>
          Your ultimate companion in dental tourism! <span className='text-cyan-500'>DentAll</span>
        </h1>
        <p className='mb-12 text-sm'>
          Our cutting-edge app is meticulously crafted to empower dentists and elevate the dental
          tourism experience.
          <br />
          <br />
          DentAll goes beyond traditional dental practice management by seamlessly integrating
          travel logistics. Dentists can now effortlessly organize accommodation, transportation,
          and other essential services for their international patients, ensuring a hassle-free and
          enjoyable journey.
        </p>
        <Link
          to='/login'
          className='bg-orange-500 px-8 py-2 text-white hover:bg-orange-600 hover:shadow-md'
        >
          Sign in
        </Link>
      </div>

      <img
        className='bus'
        src='/src/assets/Bus.svg'
        alt='bus'
      />
      <img
        className='dentist'
        src='/src/assets/Dentist.svg'
        alt='dentist'
      />
      <img
        className='house'
        src='/src/assets/House.svg'
        alt='house'
      />
    </div>
  )
}

export default LandingPage
