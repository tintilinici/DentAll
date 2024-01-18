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
  useToast,
  Select,
  HStack,
  Flex,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { usePostAccommodationOrder } from '../hooks/usePostAccommodationOrder'
import { usePutAccommodationOrder } from '../hooks/usePutAccommodationOrder'
import { AccommodationOrder, AccommodationOrderPostDTO } from '../lib/api.types'
import { AccommodationType } from '../enums/accommodation-type.enum'
import CustomDateTimeInput from './_CustomDateTimeInput'
import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useMapEvent } from 'react-leaflet/hooks'
import { Map } from 'leaflet'

interface Props {
  isOpen: boolean
  onClose: () => void
  patientId: string
  order?: AccommodationOrder
}

const AddEditAccommodationOrderModal = ({ isOpen, onClose, patientId, order }: Props) => {
  const { register, handleSubmit, reset, control, setValue, watch } =
    useForm<AccommodationOrderPostDTO>({
      defaultValues: {
        latitude: 45.81,
        longitude: 15.97,
      },
    })

  const mapRef = React.useRef<Map | null>(null)

  useEffect(() => {
    reset()
    setValue('patientId', patientId)
    if (order) {
      console.log(order)
      setValue('arrivalDateTime', order.arrivalDateTime)
      setValue('departureDateTime', order.departureDateTime)
      setValue('accommodationSize', order.accommodationSize)
      setValue('accommodationType', order.accommodationType)
      setValue('latitude', order.latitude)
      setValue('longitude', order.longitude)
      if (mapRef.current) {
        mapRef.current.setView([order.latitude, order.longitude])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, patientId, setValue, reset, mapRef.current, mapRef])

  const postAccommodationOrder = usePostAccommodationOrder(patientId)
  const putAccommodationOrder = usePutAccommodationOrder(patientId, order?.id || '') // if the order is undefined, this mutation will not be used
  const mutation = order ? putAccommodationOrder : postAccommodationOrder
  const toast = useToast()

  const onSubmit: SubmitHandler<AccommodationOrderPostDTO> = (data) => {
    console.log(data)
    mutation.mutate(data, {
      onSuccess: () => {
        onClose()
        reset()
        toast({
          title: 'Success',
          description: order
            ? 'Accommodation order updated successfully.'
            : 'Accommodation order created successfully.',
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

  function LocationMarker() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
      setValue('latitude', e.latlng.lat)
      setValue('longitude', e.latlng.lng)
      console.log(e.latlng)
    })

    return (
      <Marker position={[watch('latitude') || 45.81, watch('longitude') || 15.97]}>
        <Popup>Arrival location</Popup>
      </Marker>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW='800px'>
        <ModalHeader>{order ? 'Edit accommodation order' : 'Add accommodation order'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody className='space-y-4'>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Arrival</FormLabel>
                <Controller
                  control={control}
                  name='arrivalDateTime'
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      placeholderText='Select arrival date and time'
                      onChange={(date) => onChange(date?.toISOString() || '')}
                      selected={value ? new Date(value) : null}
                      timeFormat='HH:mm'
                      minDate={new Date()}
                      dateFormat={'dd/MM/yyyy - HH:mm'}
                      customInput={React.createElement(React.forwardRef(CustomDateTimeInput))}
                      showTimeSelect
                    />
                  )}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Departure</FormLabel>
                <Controller
                  control={control}
                  name='departureDateTime'
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      placeholderText='Select departue date and time'
                      onChange={(date) => onChange(date?.toISOString() || '')}
                      selected={value ? new Date(value) : null}
                      timeFormat='HH:mm'
                      minDate={new Date(watch('arrivalDateTime')) || new Date()}
                      dateFormat={'dd/MM/yyyy - HH:mm'}
                      customInput={React.createElement(React.forwardRef(CustomDateTimeInput))}
                      showTimeSelect
                    />
                  )}
                />
              </FormControl>
            </HStack>

            <HStack>
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
                  placeholder='type'
                  {...register('accommodationType')}
                >
                  {Object.values(AccommodationType).map((e, index) => (
                    <option
                      key={index}
                      value={e}
                    >
                      {e.toLowerCase()}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>

            <Flex
              w='100%'
              minW='600px'
              height='500px'
              position='relative'
              zIndex='0'
            >
              <MapContainer
                center={[45.81, 15.97]}
                zoom={13}
                scrollWheelZoom={true}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <LocationMarker />
              </MapContainer>
            </Flex>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              isDisabled={putAccommodationOrder.isPending}
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
              {order ? 'Edit' : 'Add'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddEditAccommodationOrderModal
