import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { AccommodationOrder } from '../lib/api.types'
import { useGetAccommodationsByOrder } from '../hooks/useGetAccommodationsByOrder'
import { useState } from 'react'

interface Props {
  order: AccommodationOrder
  isOpen: boolean
  onClose: () => void
}

const SelectAccommodationForBookingModal = ({ order, isOpen, onClose }: Props) => {
  const { data, isLoading } = useGetAccommodationsByOrder(order.id, 5000)
  // const postAccommodationBookingBooking = usePostAccommodationBooking(order.patientId, order.id)

  const [targetAccommodationId] = useState<string>('')

  // const onSubmit = () => {
  // mutation.mutate(data, {
  //   onSuccess: () => {
  //     onClose()
  //     reset()
  //     toast({
  //       title: 'Success',
  //       description: order
  //         ? 'Accommodation order updated successfully.'
  //         : 'Accommodation order created successfully.',
  //       status: 'success',
  //       duration: 5000,
  //       isClosable: true,
  //     })
  //   },
  //   onError: (error: Error) => {
  //     toast({
  //       title: 'Error',
  //       description: error.message,
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     })
  //   },
  // })
  // }

  // const LocationMarker = () => {
  //   const map = useMapEvent('click', (e) => {
  //     map.setView(e.latlng, map.getZoom(), {
  //       animate: true,
  //     })
  //   })

  //   return (
  //     <Marker position={[parseFloat(watch('latitude')), parseFloat(watch('longitude'))]}>
  //       <Popup autoPan={true}>Arrival location</Popup>
  //     </Marker>
  //   )
  // }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={800}>
        <ModalHeader>Create accommodation booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading && (
            <Spinner
              size='md'
              color='red'
            />
          )}

          {!isLoading && (!data || data?.length === 0) ? (
            <Heading
              size='md'
              color='red.700'
              mb='2'
            >
              No accomodations have been found around this location.
            </Heading>
          ) : (
            <Text mb='2'>
              Select an accommodation and convert this order to a accommodation booking.
            </Text>
          )}

          <Flex
            w='100%'
            height='500px'
            position='relative'
            zIndex='0'
            rounded={'lg'}
            overflow={'hidden'}
          >
            <MapContainer
              center={[order.latitude, order.longitude]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[order.latitude, order.longitude]}>
                <Popup autoPan={true}>Arrival location</Popup>
              </Marker>
            </MapContainer>
          </Flex>
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
          <Tooltip
            isDisabled={targetAccommodationId !== ''}
            label='Please select a accommodaiton'
          >
            <Button
              isDisabled={targetAccommodationId === ''}
              colorScheme='green'
              mr={3}
              w={'full'}
              type='submit'
            >
              Create
            </Button>
          </Tooltip>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SelectAccommodationForBookingModal
