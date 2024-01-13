import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import {Button, Flex, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import {useGetAccommodationDetails} from "../../hooks/useGetAccommodationDetails.ts";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {LatLngExpression} from "leaflet";

const AccommodationDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useGetAccommodationDetails(id || '')

  return (
    <SidebarLayout className='bg-blue-50'>
      {error || !data ? (
        <Card>{error ? error.message : 'Data for accommodation not available'}</Card>
      ) : (
        <>
          <div className='w-full flex justify-end'>
            <Card className='w-min mb-6'>
              <Button colorScheme='whatsapp'>Edit accommodation</Button>
            </Card>
          </div>
          <Card>
            <Skeleton isLoaded={!isLoading}>
              <TableContainer marginBottom="24px">
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
                      <Td className="lowercase accommodation-type"><span className={data.accommodationType.toLowerCase()}>{data.accommodationType}</span></Td>
                      <Td>{new Date(data.availabilityStart).toLocaleDateString()}</Td>
                      <Td>{new Date(data.availabilityEnd).toLocaleDateString()}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex w="100%" height="500px">
                <MapContainer center={[data.latitude as number, data.longitude as number]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[data.latitude as number, data.longitude as number]}>
                    <Popup>
                      {data.address}
                    </Popup>
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
