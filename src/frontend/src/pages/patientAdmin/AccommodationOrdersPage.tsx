import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Button,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import SidebarLayout from '../../components/SidebarLayout'
import Card from '../../components/Card'
import AddAccommodationOrderModal from '../../components/AddAccommodationOrderModal'
import { useGetAccommodationOrders } from '../../hooks/useGetAccommodationOrders'
import { useDeleteAccommodationOrder } from '../../hooks/useDeleteAccommodationOrder'
import AccommodationTypeTag from '../../components/AccomodationTypeTag'

const AccommodationOrdersPage = () => {
  const { id } = useParams<{ id: string }>()

  const {
    isOpen: isEditAccommodationOrderModalOpen,
    onOpen: onEditAccommodationOrderModalOpen,
    onClose: onEditAccommodationOrderModalClose,
  } = useDisclosure()

  const { data, error, isLoading } = useGetAccommodationOrders(id || '')
  const deleteAccommodationOrder = useDeleteAccommodationOrder(id || '')

  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null)

  const toast = useToast()

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

  const handleDeleteOrderButtonClick = (orderId: string) => {
    onAlertOpen()
    setSelectedOrderId(orderId)
  }

  const confirmDeleteOrder = () => {
    if (selectedOrderId) {
      deleteAccommodationOrder.mutate(selectedOrderId, {
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
      onAlertClose()
    }
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
                      <Th>Edit</Th>
                      <Th>Remove</Th>
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
                        <Td>
                          <AccommodationTypeTag accommodationType={order.accommodationType} />
                        </Td>
                        <Td>
                          <AddAccommodationOrderModal
                            isOpen={isEditAccommodationOrderModalOpen}
                            onClose={onEditAccommodationOrderModalClose}
                            patientId={id}
                            orderId={order.id}
                          />
                          <Button
                            colorScheme='whatsapp'
                            onClick={onEditAccommodationOrderModalOpen}
                          >
                            Edit
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            size={'sm'}
                            fontWeight={'semibold'}
                            colorScheme='red'
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteOrderButtonClick(order.id)
                            }}
                          >
                            Remove
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Skeleton>
          </Card>
          <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onAlertClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader
                  fontSize='lg'
                  fontWeight='bold'
                >
                  Delete accommodation order
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onAlertClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme='red'
                    onClick={confirmDeleteOrder}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </SidebarLayout>
  )
}

export default AccommodationOrdersPage
