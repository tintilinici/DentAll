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
  Select,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { usePostAccommodationOrder } from '../hooks/usePostAccommodationOrder'
import { AccommodationOrderPostDTO } from '../lib/api.types'

interface Props {
  isOpen: boolean
  onClose: () => void
  patientId: string
}

const AddAccommodationOrderModal = ({ isOpen, onClose, patientId }: Props) => {
  const { register, handleSubmit, reset } = useForm<AccommodationOrderPostDTO>({
    defaultValues: {
      patientId: patientId,
    },
  })

  const postAccommodationOrder = usePostAccommodationOrder(patientId)
  const toast = useToast()

  console.log(postAccommodationOrder)

  const onSubmit: SubmitHandler<AccommodationOrderPostDTO> = (data) => {
    postAccommodationOrder.mutate(data, {
      onSuccess: () => {
        onClose()
        reset()
        toast({
          title: 'Success',
          description: 'Accommodation order made',
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
        <ModalHeader>Add a new accommodation order</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody
            pb={6}
            className='space-y-4'
          >
            <FormControl isRequired>
              <FormLabel>Arrival</FormLabel>
              <Input
                placeholder='Select Date and Time'
                size='md'
                type='datetime-local'
                {...register('arrivalDatetime')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Departure</FormLabel>
              <Input
                placeholder='Select Date and Time'
                size='md'
                type='datetime-local'
                {...register('departureDatetime')}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Accommodation size</FormLabel>
              <NumberInput>
                <NumberInputField
                  placeholder='1'
                  minLength={1}
                  maxLength={100}
                  {...register('accommodationSize')}
                />
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Accommodation type</FormLabel>
              <Select
                placeholder='Accommodation type'
                {...register('accommodationType')}
              >
                <option value={'ROOM'}>Room</option>
                <option value={'HOUSE'}>House</option>
                <option value={'APARTMENT'}>Apartment</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              isDisabled={postAccommodationOrder.isPending}
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
              isLoading={postAccommodationOrder.isPending}
            >
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddAccommodationOrderModal
