import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
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
import { useEffect } from 'react'
import * as React from 'react'
import { usePatchAdmin } from '../hooks/usePatchAdmin.ts'
import { User } from '../lib/api.types.ts'

interface Props {
  isOpen: boolean
  onClose: () => void
  currentUser: User
}

const EditAdminModal = ({ currentUser, isOpen, onClose }: Props) => {
  const [user, setUser] = React.useState<User>(currentUser)

  useEffect(() => {
    setUser(currentUser)
  }, [currentUser])

  const patchAdminMutation = usePatchAdmin()

  const toast = useToast()

  const handleSubmit = () => {
    const trimmedRoles = user.roles?.map((role) => {
      return role.replace('ROLE_', '')
    })

    if (user.email === 'admin@admin.com') return

    patchAdminMutation.mutate(
      { email: user.email, roles: trimmedRoles },
      {
        onSuccess: () => {
          onClose()
          toast({
            title: 'Success',
            description: 'Admin edited successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {currentUser.email}</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody className='space-y-4'>
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
              isDisabled={patchAdminMutation.isPending}
              variant={'outline'}
              colorScheme='red'
              w={'full'}
            >
              Cancel
            </Button>
            <Button
              colorScheme='green'
              w={'full'}
              isLoading={patchAdminMutation.isPending}
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

export default EditAdminModal
