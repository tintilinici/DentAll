import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
} from '@chakra-ui/react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TransportVehiclePostDTO } from '../lib/api.types'
import { usePostTransportVehicle } from '../hooks/usePostTransportVehicle'

interface Props {
  isOpen: boolean
  onClose: () => void
  companyId: string
}

const AddTransportVehicleModal = ({ isOpen, onClose, companyId }: Props) => {
  const { register, handleSubmit, reset } = useForm<TransportVehiclePostDTO>({
    defaultValues: {
      transportCompanyId: companyId,
    },
  })

  const postTransportVehicle = usePostTransportVehicle(companyId)

  const toast = useToast()

  const onSubmit: SubmitHandler<TransportVehiclePostDTO> = (data) => {
    postTransportVehicle.mutate(data, {
      onSuccess: () => {
        onClose()
        reset()
        toast({
          title: 'Success',
          description: 'Transport vehicle was added successfully',
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
        <ModalHeader>Add a new transport vehicle</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody
            pb={6}
            className='space-y-4'
          >
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Select
                placeholder='Vehicle type'
                {...register('transportVehicleType')}
              >
                <option value={'BUS'}>Bus</option>
                <option value={'CAR'}>Car</option>
                <option value={'VAN'}>Van</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Capacity</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder='8'
                  min={1}
                  max={100}
                  {...register('capacity')}
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              isDisabled={postTransportVehicle.isPending}
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
              isLoading={postTransportVehicle.isPending}
            >
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddTransportVehicleModal
