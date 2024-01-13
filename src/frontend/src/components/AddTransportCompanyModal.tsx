import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { usePostTransportCompany } from '../hooks/usePostTransportCompany'
import { TransportCompanyPostDTO } from '../lib/api.types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddTransportCompanyModal = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<TransportCompanyPostDTO>()

  const postTansportCompanyMutation = usePostTransportCompany()
  const toast = useToast()

  const onSubmit: SubmitHandler<TransportCompanyPostDTO> = (data) => {
    postTansportCompanyMutation.mutate(data, {
      onSuccess: () => {
        onClose()
        reset()
        // why this not ressetin phone number
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
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new transport company</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody
            pb={6}
            className='space-y-4'
          >
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder='First name'
                type='text'
                minLength={5}
                maxLength={100}
                {...register('name')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                placeholder='Last name'
                minLength={5}
                maxLength={50}
                {...register('email')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone number</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder='+385926822842'
                  minLength={5}
                  {...register('phoneNumber')}
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              isDisabled={postTansportCompanyMutation.isPending}
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
              type='submit'
              isLoading={postTansportCompanyMutation.isPending}
            >
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddTransportCompanyModal
