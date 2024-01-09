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

  const postTansportCompany = usePostTransportCompany()

  const onSubmit: SubmitHandler<TransportCompanyPostDTO> = (data) => {
    postTansportCompany.mutate(data, {
      onSuccess: () => {
        onClose()
        reset()
      },
      onError: (error) => {
        // FIXME: needs to be converted to toast
        console.log(error)
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
