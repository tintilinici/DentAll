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
import routes from '../../constants/routes'
import Card from '../../components/Card'
import { useGetAccommodations } from '../../hooks/useGetAccommodations'
import { useDeleteAccommodationMutation } from '../../hooks/useDeleteAccommodation'
import AddEditAccommodationModal from '../../components/AddEditAccommodationModal'
import AccommodationTypeTag from '../../components/AccomodationTypeTag'
import { useState } from 'react'
import useConfirmModal from '../../hooks/useConfirmModal'

const AccommodationAdminDashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, error } = useGetAccommodations()
  const deleteAccommodationMutation = useDeleteAccommodationMutation()
  const toast = useToast()

  const navigate = useNavigate()

  const [targetAccommodationId, setTargetAccommodationId] = useState<string>('')
  const { openConfirmModal, ConfirmModal } = useConfirmModal()

  const deleteAccommodation = () => {
    deleteAccommodationMutation.mutate(targetAccommodationId, {
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
              <Tbody>
                {data?.map((accommodation) => (
                  <Tr
                    key={accommodation.id}
                    onClick={() => handleOnRowClick(accommodation.id)}
                    className='cursor-pointer hover:bg-gray-100'
                  >
                    <Td>{accommodation.address}</Td>
                    <Td>
                      <AccommodationTypeTag accommodationType={accommodation.accommodationType} />
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
                          setTargetAccommodationId(accommodation.id)
                          openConfirmModal()
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
      <ConfirmModal
        title='Brisanje smještaja'
        description='Jeste li sigurni da želite obrisati smještaj?'
        onConfirm={deleteAccommodation}
      />
    </SidebarLayout>
  )
}

export default AccommodationAdminDashboardPage
