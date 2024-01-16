import {
  Button,
  Flex,
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
  Select,
  useToast,
} from '@chakra-ui/react'

import { Accommodation } from '../lib/api.types'
import { usePutAccommodation } from '../hooks/usePutAccommodation.ts'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { AccommodationType } from '../enums/accommodation-type.enum.ts'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { usePostAccommodation } from '../hooks/usePostAccommodation.ts'
import CustomDateTimeInput from './CustomDateTimeInput.tsx'

interface Props {
  isOpen: boolean
  onClose: () => void
  accommodation?: Accommodation
}

const AddTransportCompanyModal = ({ accommodation, isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState<Accommodation>({
    id: '',
    address: '',
    accommodationType: '',
    availabilityStart: new Date().toISOString().split('T')[0],
    availabilityEnd: new Date().toISOString().split('T')[0],
    latitude: '45.815',
    longitude: '15.982',
  })

  const putAccommodation = usePutAccommodation()
  const postAccommodation = usePostAccommodation()

  const toast = useToast()

  useEffect(() => {
    if (accommodation?.id) {
      setFormData(accommodation)
    }
  }, [accommodation])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    setFormData(newFormData)
  }

  const onSubmit = () => {
    const handleSubmit = formData?.id ? putAccommodation : postAccommodation
    handleSubmit.mutate(formData, {
      onSuccess: () => {
        onClose()
        setFormData(null!)
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

  function LocationMarker() {
    useMapEvents({
      click(e) {
        if (!formData?.id) {
          setFormData({
            ...formData,
            latitude: e.latlng.lat.toString(),
            longitude: e.latlng.lng.toString(),
          })
        }
      },
    })

    return (
      <Marker
        position={[
          (formData?.latitude as unknown as number) ?? 45.815,
          (formData?.longitude as unknown as number) ?? 15.982,
        ]}
      >
        <Popup>{formData?.address}</Popup>
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
        {accommodation?.id && <ModalHeader>Edit accommodation</ModalHeader>}
        {!accommodation?.id && <ModalHeader>Add a new accommodation</ModalHeader>}
        <ModalCloseButton />
        <form>
          <ModalBody
            pb={6}
            className='space-y-4'
          >
            <Flex
              flexWrap='wrap'
              justifyContent='space-between'
            >
              <FormControl
                w='48%'
                marginBottom='24px'
                isRequired
              >
                <FormLabel>Address</FormLabel>
                <Input
                  id='address'
                  placeholder='Address'
                  type='text'
                  minLength={3}
                  maxLength={100}
                  value={formData?.address ?? ''}
                  onChange={handleFormChange}
                />
              </FormControl>

              <FormControl
                w='48%'
                marginBottom='24px'
                isRequired
              >
                <FormLabel>Type</FormLabel>
                <Select
                  id='accommodationType'
                  placeholder='Type'
                  value={formData?.accommodationType}
                  onChange={handleFormChange}
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

              <FormControl
                w='48%'
                marginBottom='24px'
                isRequired
              >
                <FormLabel>Available from</FormLabel>
                <DatePicker
                  selected={new Date(formData?.availabilityStart ?? new Date())}
                  onChange={(date) => {
                    const formattedDate = date ? date.toLocaleDateString('en-CA') : ''
                    setFormData({ ...formData, availabilityStart: formattedDate })
                  }}
                  dateFormat='dd/MM/yyyy'
                  // wierd fix per: https://github.com/Hacker0x01/react-datepicker/issues/2165#issuecomment-711032947
                  customInput={React.createElement(React.forwardRef(CustomDateTimeInput))}
                />
              </FormControl>

              <FormControl
                w='48%'
                marginBottom='24px'
                isRequired
              >
                <FormLabel>Available to</FormLabel>
                <DatePicker
                  selected={new Date(formData?.availabilityEnd ?? new Date())}
                  onChange={(date) => {
                    const formattedDate = date ? date.toLocaleDateString('en-CA') : ''
                    setFormData({ ...formData, availabilityEnd: formattedDate })
                  }}
                  dateFormat='dd/MM/yyyy'
                  customInput={React.createElement(React.forwardRef(CustomDateTimeInput))}
                />
              </FormControl>

              <Flex
                w='100%'
                minW='600px'
                height='500px'
                position='relative'
                zIndex='0'
              >
                <MapContainer
                  center={[
                    (formData?.latitude as unknown as number) ?? 45.815,
                    (formData?.longitude as unknown as number) ?? 15.982,
                  ]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <LocationMarker />
                </MapContainer>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              isDisabled={putAccommodation.isPending}
              variant={'outline'}
              colorScheme='red'
              w={'full'}
            >
              Cancel
            </Button>
            {!accommodation?.id && (
              <Button
                colorScheme='green'
                mr={3}
                w={'full'}
                isLoading={putAccommodation.isPending}
                onClick={() => onSubmit()}
              >
                Create
              </Button>
            )}
            {accommodation?.id && (
              <Button
                colorScheme='green'
                mr={3}
                w={'full'}
                isLoading={putAccommodation.isPending}
                onClick={() => onSubmit()}
              >
                Save
              </Button>
            )}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddTransportCompanyModal
