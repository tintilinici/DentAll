import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth/useAuth'
import { roleDefaultRoutes } from '../components/auth/authTypes'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword((state) => !state)

  const { login, getRoles } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    login({ email, password }, () => navigate(roleDefaultRoutes[getRoles()[0]]))
  }

  return (
    <div className='h-full bg-gray-100 p-8'>
      <Link
        className='text-2xl font-bold italic text-cyan-500'
        to='/'
      >
        DentAll
      </Link>
      <div className='mx-auto mt-16 max-w-md rounded-lg bg-white shadow-md'>
        <div className='space-y-8 p-8'>
          <p className='text-center font-bold'>Sign in to your account</p>
          <div>
            <p className='mb-2'>Email</p>
            <Input
              value={email}
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john.doe@domain.example'
              name='email'
            />
          </div>
          <div>
            <p className='mb-2'>Password</p>
            <InputGroup
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit()
              }}
            >
              <Input
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='yourpassword'
                name='password'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <Button
            width={'full'}
            colorScheme='orange'
            type='submit'
            onClick={handleSubmit}
            name='submit'
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
