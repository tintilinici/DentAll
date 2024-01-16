import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import {
  Button,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useGetAccommodationDetails } from '../../hooks/useGetAccommodationDetails.ts'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import AddEditAccommodationModal from '../../components/AddEditAccommodationModal.tsx'

const AccommodationDetailsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useGetAccommodationDetails(id || '')

  return (
    <SidebarLayout className='bg-blue-50'>
      {error || !data ? (
        <Card>{error ? error.message : 'Data for accommodation not available'}</Card>
      ) : (
        <>
          <AddEditAccommodationModal
            accommodation={data}
            isOpen={isOpen}
            onClose={onClose}
          />
          <div className='flex w-full justify-end'>
            <Card className='mb-6 w-min'>
              <Button
                colorScheme='whatsapp'
                onClick={onOpen}
              >
                Edit accommodation
              </Button>
            </Card>
          </div>
          <Card>
            <Skeleton isLoaded={!isLoading}>
              <TableContainer marginBottom='24px'>
                <Table variant={'simple'}>
                  <Thead>
                    <Tr>
                      <Th>Address</Th>
                      <Th>Type</Th>
                      <Th>Available from</Th>
                      <Th>Available to</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{data.address}</Td>
                      <Td className='accommodation-type lowercase'>
                        <span className={data.accommodationType.toLowerCase()}>
                          {data.accommodationType}
                        </span>
                      </Td>
                      <Td>{new Date(data.availabilityStart).toLocaleDateString()}</Td>
                      <Td>{new Date(data.availabilityEnd).toLocaleDateString()}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex
                w='100%'
                height='500px'
              >
                <MapContainer
                  center={[data.latitude as unknown as number, data.longitude as unknown as number]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker
                    position={[
                      data.latitude as unknown as number,
                      data.longitude as unknown as number,
                    ]}
                  >
                    <Popup>{data.address}</Popup>
                  </Marker>
                </MapContainer>
              </Flex>
            </Skeleton>
          </Card>
        </>
      )}
    </SidebarLayout>
  )
}

export default AccommodationDetailsPage
