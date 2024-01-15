import { useParams } from 'react-router-dom'
import { Skeleton, Table, TableContainer, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import SidebarLayout from '../../components/SidebarLayout'
import Card from '../../components/Card'
import { useGetAccommodationOrders } from '../../hooks/useGetAccommodationOrders'

const AccommodationOrdersPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error, isLoading } = useGetAccommodationOrders(id || '')

  console.log(data)

  if (id === undefined) {
    return (
      <SidebarLayout className='bg-blue-50'>
        <Card>Patient id not provided</Card>
      </SidebarLayout>
    )
  }

  function formatDateTime(dateTimeString: string) {
    const dateTime = new Date(dateTimeString)
    const formattedDate = dateTime.toLocaleDateString('hr-HR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const formattedTime = dateTime.toLocaleTimeString('hr-HR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    return `${formattedDate} ${formattedTime}`
  }

  return (
    <SidebarLayout className='bg-blue-50'>
      {error || !data ? (
        <Card>{error ? error.message : 'Accommodation orders for patient not available'}</Card>
      ) : (
        <>
          <Card>
            <Skeleton isLoaded={!isLoading}>
              <TableContainer>
                <Table variant={'simple'}>
                  <Thead>
                    <Tr>
                      <Th>Arrival</Th>
                      <Th>Departure</Th>
                      <Th>Accommodation size</Th>
                      <Th>Accommodation type</Th>
                      <Th>Booking id</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((order) => (
                      <Tr
                        key={order.id}
                        className='cursor-pointer hover:bg-gray-100'
                      >
                        <Td>{formatDateTime(order.arrivalDateTime)}</Td>
                        <Td>{formatDateTime(order.departureDateTime)}</Td>
                        <Td>{order.accommodationSize}</Td>
                        <Td>{order.accommodationType}</Td>
                        <Td>{order.accommodationBookingId}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Skeleton>
          </Card>
        </>
      )}
    </SidebarLayout>
  )
}

export default AccommodationOrdersPage
