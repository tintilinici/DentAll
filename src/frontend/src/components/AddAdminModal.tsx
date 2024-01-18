import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react'

import * as React from 'react'
import { useState } from 'react'
import { usePostAdmin } from '../hooks/usePostAdmin.js'
import { UserPostDTO } from '../lib/api.types.js'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddAdminModal = ({ isOpen, onClose }: Props) => {
  const [user, setUser] = useState<UserPostDTO>({
    email: '',
    roles: [],
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const registerAdminMutation = usePostAdmin()

  const toast = useToast()

  const handleSubmit = () => {
    const trimmedRoles = user.roles?.map((role) => {
      return role.replace('ROLE_', '')
    })

    registerAdminMutation.mutate(
      { email: user.email, roles: trimmedRoles, password: user.password },
      {
        onSuccess: () => {
          onClose()
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        },
      }
    )
  }

  const handleRoles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user.roles.includes(e.target.value)) {
      const newRoles = user.roles.filter((rola) => rola !== e.target.value)
      setUser({ ...user, roles: newRoles })
    } else {
      const newRoles = [...user.roles, e.target.value]
      setUser({ ...user, roles: newRoles })
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newUser = { ...user, [e.target.id]: e.target.value }
    setUser(newUser)
  }

  const handleClose = () => {
    setUser({
      email: '',
      roles: [],
      password: '',
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new user</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody className='space-y-4'>
            <FormControl
              marginBottom='24px'
              isRequired
            >
              <FormLabel>Email</FormLabel>
              <Input
                id='email'
                placeholder='Email'
                type='text'
                minLength={3}
                maxLength={100}
                value={user?.email ?? ''}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl
              marginBottom='24px'
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  value={user.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleFormChange}
                  placeholder='Password'
                  name='password'
                  id='password'
                  minLength={3}
                  maxLength={100}
                />
                <InputRightElement width='4.5rem'>
                  <Button
                    h='1.75rem'
                    size='sm'
                    onClick={() => setShowPassword((state) => !state)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Select roles</FormLabel>
              <Stack direction='column'>
                <Checkbox
                  value='ROLE_ACCOMMODATION'
                  isChecked={user.roles.includes('ROLE_ACCOMMODATION')}
                  onChange={handleRoles}
                >
                  Accommodation
                </Checkbox>
                <Checkbox
                  value='ROLE_PATIENT'
                  isChecked={user.roles.includes('ROLE_PATIENT')}
                  onChange={handleRoles}
                >
                  Patient
                </Checkbox>
                <Checkbox
                  value='ROLE_TRANSPORT'
                  isChecked={user.roles.includes('ROLE_TRANSPORT')}
                  onChange={handleRoles}
                >
                  Transport
                </Checkbox>
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter gap='4'>
            <Button
              onClick={onClose}
              isDisabled={registerAdminMutation.isPending}
              variant={'outline'}
              colorScheme='red'
              w={'full'}
            >
              Cancel
            </Button>
            <Button
              colorScheme='green'
              w={'full'}
              isLoading={registerAdminMutation.isPending}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddAdminModal
