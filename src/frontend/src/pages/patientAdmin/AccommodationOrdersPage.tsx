import { useParams } from 'react-router-dom'
import {
  Button,
  HStack,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import SidebarLayout from '../../components/SidebarLayout'
import Card from '../../components/Card'
import AddEditAccommodationOrderModal from '../../components/AddEditAccommodationOrderModal'
import { useGetAccommodationOrders } from '../../hooks/useGetAccommodationOrders'
import { useDeleteAccommodationOrder } from '../../hooks/useDeleteAccommodationOrder'
import AccommodationTypeTag from '../../components/AccomodationTypeTag'
import useConfirmModal from '../../hooks/useConfirmModal'
import { useState } from 'react'
import { AccommodationOrder } from '../../lib/api.types'
import SelectAccommodationForBookingModal from '../../components/SelectAccommodationForBookingModal'
import { cn } from '../../lib/utils'

function sortOrders(a: AccommodationOrder, z: AccommodationOrder): number {
  const hasBooking =
    (z.accommodationBookingId === null ? 1 : 0) - (a.accommodationBookingId === null ? 1 : 0)
  if (hasBooking !== 0) return hasBooking

  const aDate = new Date(a.arrivalDateTime).getTime()
  const zDate = new Date(z.arrivalDateTime).getTime()
  return aDate - zDate
}

const AccommodationOrdersPage = () => {
  const { id } = useParams<{ id: string }>()

  const {
    isOpen: isEditAccommodationOrderModalOpen,
    onOpen: onEditAccommodationOrderModalOpen,
    onClose: onEditAccommodationOrderModalClose,
  } = useDisclosure()

  const {
    isOpen: isSelectAccommodationForBookingModalOpen,
    onOpen: onSelectAccommodationForBookingModalOpen,
    onClose: onSelectAccommodationForBookingModalClose,
  } = useDisclosure()

  const [targetOrder, setTargetOrder] = useState<AccommodationOrder>({} as AccommodationOrder)

  const { data, error, isLoading } = useGetAccommodationOrders(id || '')
  const deleteAccommodationOrder = useDeleteAccommodationOrder(id || '')

  const toast = useToast()

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

  const { openConfirmModal, ConfirmModal } = useConfirmModal()

  const deleteOrder = (orderId: string) => {
    deleteAccommodationOrder.mutate(orderId, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Accommodation order deleted successfully.',
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

  if (id === undefined) {
    return (
      <SidebarLayout className='bg-blue-50'>
        <Card>Patient id not provided</Card>
      </SidebarLayout>
    )
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
                      <Th>Manage</Th>
                      <Th>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.sort(sortOrders).map((order) => (
                      <Tooltip
                        label='This order is a booking'
                        isDisabled={order.accommodationBookingId === null}
                      >
                        <Tr
                          key={order.id}
                          className={cn(
                            order.accommodationBookingId !== null
                              ? 'bg-gray-50'
                              : 'cursor-pointer hover:bg-gray-100'
                          )}
                        >
                          <ConfirmModal
                            title='Brisanje narudžbe'
                            description='Jeste li sigurni da želite obrisati narudžbu?'
                            onConfirm={() => deleteOrder(order.id)}
                          />
                          <Td>{formatDateTime(order.arrivalDateTime)}</Td>
                          <Td>{formatDateTime(order.departureDateTime)}</Td>
                          <Td>{order.accommodationSize}</Td>
                          <Td>
                            <AccommodationTypeTag accommodationType={order.accommodationType} />
                          </Td>
                          <Td>
                            <HStack gap={6}>
                              <Button
                                isDisabled={order.accommodationBookingId !== null}
                                size={'sm'}
                                colorScheme='whatsapp'
                                onClick={() => {
                                  setTargetOrder(order)
                                  onSelectAccommodationForBookingModalOpen()
                                }}
                              >
                                + Create booking
                              </Button>
                              <Button
                                isDisabled={order.accommodationBookingId !== null}
                                colorScheme='whatsapp'
                                variant={'outline'}
                                onClick={() => {
                                  setTargetOrder(order)
                                  onEditAccommodationOrderModalOpen()
                                }}
                                size='sm'
                              >
                                Edit
                              </Button>
                            </HStack>
                          </Td>
                          <Td>
                            <Button
                              isDisabled={order.accommodationBookingId !== null}
                              size={'sm'}
                              fontWeight={'semibold'}
                              colorScheme='red'
                              onClick={(e) => {
                                e.stopPropagation()
                                openConfirmModal()
                              }}
                            >
                              Remove
                            </Button>
                          </Td>
                        </Tr>
                      </Tooltip>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Skeleton>
          </Card>
        </>
      )}

      {isSelectAccommodationForBookingModalOpen && (
        <SelectAccommodationForBookingModal
          order={targetOrder}
          isOpen={isSelectAccommodationForBookingModalOpen}
          onClose={onSelectAccommodationForBookingModalClose}
        />
      )}

      {isEditAccommodationOrderModalOpen && (
        <AddEditAccommodationOrderModal
          isOpen={isEditAccommodationOrderModalOpen}
          onClose={onEditAccommodationOrderModalClose}
          patientId={id}
          order={targetOrder}
        />
      )}
    </SidebarLayout>
  )
}

export default AccommodationOrdersPage
