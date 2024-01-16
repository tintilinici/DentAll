import SidebarLayout from '../../components/SidebarLayout'
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
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes.ts'
import Card from '../../components/Card.tsx'
import { useGetAccommodations } from '../../hooks/useGetAccommodations.ts'
import { useDeleteAccommodationMutation } from '../../hooks/useDeleteAccommodation.ts'
import AddEditAccommodationModal from '../../components/AddEditAccommodationModal.tsx'

const AccommodationAdminDashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, error } = useGetAccommodations()
  const deleteAccommodationMutation = useDeleteAccommodationMutation()
  const toast = useToast()

  const navigate = useNavigate()

  const handleDeleteAccommodation = (id: string) => {
    deleteAccommodationMutation.mutate(id, {
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

  const handleOnRowClick = (id: string) => {
    navigate(`${routes.ACCOMMODATION}/${id}`)
  }

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout className='bg-blue-50'>
      <AddEditAccommodationModal
        isOpen={isOpen}
        onClose={onClose}
      />
      <div className='flex w-full justify-end'>
        <Card className='mb-6 w-min'>
          <Button
            colorScheme='whatsapp'
            onClick={onOpen}
          >
            Add accommodation
          </Button>
        </Card>
      </div>

      <Card>
        <Skeleton isLoaded={!isLoading}>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Address</Th>
                  <Th>Type</Th>
                  <Th>Available from</Th>
                  <Th>Available to</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>
              <Tbody className='row-hover'>
                {data?.map((accommodation) => (
                  <Tr
                    key={accommodation.id}
                    onClick={() => handleOnRowClick(accommodation.id)}
                  >
                    <Td>{accommodation.address}</Td>
                    <Td className='accommodation-type lowercase'>
                      <span className={accommodation.accommodationType.toLowerCase()}>
                        {accommodation.accommodationType}
                      </span>
                    </Td>
                    <Td>{new Date(accommodation.availabilityStart).toLocaleDateString()}</Td>
                    <Td>{new Date(accommodation.availabilityEnd).toLocaleDateString()}</Td>
                    <Td>
                      <Button
                        size={'sm'}
                        fontWeight={'semibold'}
                        colorScheme='red'
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAccommodation(accommodation.id)
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
    </SidebarLayout>
  )
}

export default AccommodationAdminDashboardPage
