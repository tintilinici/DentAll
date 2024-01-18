import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { AccommodationOrder } from '../lib/api.types'

interface Props {
  order: AccommodationOrder
  isOpen: boolean
  onClose: () => void
}

const SelectAccommodationForBookingModal = ({ order, isOpen, onClose }: Props) => {
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
        <ModalHeader>Avaliable Accommodations</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          <Button
            colorScheme='green'
            mr={3}
            w={'full'}
            type='submit'
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SelectAccommodationForBookingModal
