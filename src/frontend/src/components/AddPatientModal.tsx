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
import { usePostPatient } from '../hooks/usePostPatient'
import { PatientPostDTO } from '../lib/api.types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddPatientModal = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, reset } = useForm<PatientPostDTO>()

  const postPatientMutation = usePostPatient()
  const toast = useToast()

  const onSubmit: SubmitHandler<PatientPostDTO> = (data) => {
    postPatientMutation.mutate(data, {
      onSuccess: () => {
        onClose()
        reset()
        toast({
          title: 'Success',
          description: 'New patient added successfully.',
          status: 'success',
          duration: 2000,
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
        <ModalHeader>Add a new patient</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody
            pb={6}
            className='space-y-4'
          >
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder='First name'
                type='text'
                pattern='^[A-Za-z]+$'
                minLength={3}
                maxLength={100}
                {...register('firstName')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                type='text'
                placeholder='Last name'
                pattern='^[A-Za-z]+$'
                minLength={3}
                maxLength={100}
                {...register('lastName')}
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

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                placeholder='example@example.com'
                minLength={5}
                maxLength={50}
                {...register('email')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>PIN</FormLabel>
              <NumberInput>
                <NumberInputField
                  type='number'
                  placeholder='1234'
                  minLength={4}
                  maxLength={4}
                  {...register('pin')}
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              isDisabled={postPatientMutation.isPending}
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
              isLoading={postPatientMutation.isPending}
            >
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddPatientModal
