import {
  Button, Checkbox, Flex,
  FormControl,
  FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'

import {useEffect, useState} from "react";
import * as React from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { usePatchAdmin } from "../hooks/usePatchAdmin.ts";
import {usePostAdmin} from "../hooks/usePostAdmin.ts";

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddEditAdminModal = ({ data, isOpen, onClose }: Props) => {

  const [user, setUser] = useState<{email: string, roles: string[], password: string}>({
    email: '',
    roles: [],
    password: ''
  });

  const patchAdminMutation = usePatchAdmin()
  const registerAdminMutation = usePostAdmin()

  const toast = useToast()

  useEffect(() => {
    setUser(data)
  }, [data]);


  const handleSubmit = () => {
    const trimmedRoles = user.roles?.map((role) => {
      return role.replace("ROLE_", "");
    });

    if(data?.email){
      patchAdminMutation.mutate({ email: user.email, roles: trimmedRoles }, {
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
      });
    } else {
      registerAdminMutation.mutate({ email: user.email, roles: trimmedRoles, password: user.password }, {
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
      });
    }
  };

  const handleRoles = (e) => {
    if(user.roles.includes(e.target.value)){
      const newRoles = user.roles.filter(rola => rola !== e.target.value)
      setUser({...user, roles: newRoles})
    } else {
      const newRoles = [...user.roles, e.target.value];
      setUser({...user, roles: newRoles})
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newUser = {...user, [e.target.id]: e.target.value}
    setUser(newUser)
  }

  const handleClose = () => {
    setUser({
      email: '',
      roles: [],
      password: ''
    });
    onClose();
  };

  return (
    <Modal
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
    >
      <ModalOverlay />
      <ModalContent maxW="400px">
        { data?.email &&
            <ModalHeader>Edit { data.email }</ModalHeader>
        }
        { !data?.email &&
            <ModalHeader>Add new user</ModalHeader>
        }
        <ModalCloseButton />
        <form>
          <ModalBody
              pb={6}
              className='space-y-4'
          >
            <Flex flexWrap="wrap" justifyContent="space-between">
              { !data?.email && (
                <>
                <FormControl w="48%" marginBottom="24px" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                      id="email"
                      placeholder='Email'
                      type='text'
                      minLength={3}
                      maxLength={100}
                      value={user?.email ?? ''}
                      onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl w="48%" marginBottom="24px" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                      id="password"
                      placeholder='Password'
                      type='text'
                      minLength={3}
                      maxLength={100}
                      value={user?.password ?? ''}
                      onChange={handleFormChange}
                  />
                </FormControl>
                </>
              )}
              <FormControl w="48%" marginBottom="24px" isRequired>
                <FormLabel>Select roles</FormLabel>
                <Flex flexFlow="column">
                  <Checkbox value="ROLE_ACCOMMODATION" isChecked={user.roles.includes('ROLE_ACCOMMODATION')} onChange={handleRoles}>Accommodation</Checkbox>
                  <Checkbox value="ROLE_TRANSPORT" isChecked={user.roles.includes('ROLE_TRANSPORT')} onChange={handleRoles}>Transport</Checkbox>
                  <Checkbox value="ROLE_PATIENT" isChecked={user.roles.includes('ROLE_PATIENT')} onChange={handleRoles}>Patient</Checkbox>
                </Flex>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Flex flexFlow="column" gap="12px" w="100%">
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
                  mr={3}
                  w={'full'}
                  isLoading={patchAdminMutation.isPending}
                  onClick={handleSubmit}
              >
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddEditAdminModal
