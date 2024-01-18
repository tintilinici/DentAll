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
  useToast,
} from '@chakra-ui/react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { AccommodationOrder } from '../lib/api.types'
import { useGetAccommodationsByOrder } from '../hooks/useGetAccommodationsByOrder'
import { useEffect, useState } from 'react'
import { Icon } from 'leaflet'
import { usePostAccommodationBooking } from '../hooks/usePostAccommodationBooking'

const patientsArrivalLocationIcon = new Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const accomodationIcon = new Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const selectedAccomodationIcon = new Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface Props {
  order: AccommodationOrder
  isOpen: boolean
  onClose: () => void
}

const SelectAccommodationForBookingModal = ({ order, isOpen, onClose }: Props) => {
  const { data, isLoading, error } = useGetAccommodationsByOrder(order.id || 'EMPTY', 100000)
  const postAccommodationBookingBooking = usePostAccommodationBooking(order.patientId, order.id)

  const [targetAccommodationId, setTargetAccommodationId] = useState<string>('')

  const toast = useToast()

  const onConfirm = () => {
    postAccommodationBookingBooking.mutate(targetAccommodationId, {
      onSuccess: () => {
        onClose()
        setTargetAccommodationId('')
        toast({
          title: 'Success',
          description: 'The accommodation booking has been created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      onError: (error: Error) => {
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

  useEffect(() => {
    setTargetAccommodationId('')
  }, [order])

  const AccomodationMarkers = () => {
    return (
      data &&
      data.map((accommodation) => (
        <Marker
          key={accommodation.id}
          position={[parseFloat(accommodation.latitude), parseFloat(accommodation.longitude)]}
          eventHandlers={{
            click: () => setTargetAccommodationId(accommodation.id),
          }}
          icon={
            targetAccommodationId === accommodation.id ? selectedAccomodationIcon : accomodationIcon
          }
        >
          <Popup autoPan={true}>{accommodation.address}</Popup>
        </Marker>
      ))
    )
  }

  if (error) console.error(error)

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
              <Marker
                icon={patientsArrivalLocationIcon}
                position={[order.latitude, order.longitude]}
              >
                <Popup autoPan={true}>Arrival location</Popup>
              </Marker>
              <AccomodationMarkers />
            </MapContainer>
          </Flex>
        </ModalBody>

        <ModalFooter className='space-x-2'>
          <Button
            onClick={() => {
              onClose()
              setTargetAccommodationId('')
            }}
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
              onClick={onConfirm}
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
