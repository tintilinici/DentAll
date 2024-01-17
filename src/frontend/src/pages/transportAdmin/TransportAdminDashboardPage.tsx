import {
  Button,
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
import { useNavigate } from 'react-router-dom'
import AddEditTransportCompanyModal from '../../components/AddEditTransportCompanyModal'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import routes from '../../constants/routes'
import { useGetTransportCompanies } from '../../hooks/useGetTransportCompanies'
import { useDeleteTransportCompanyMutation } from '../../hooks/useDeleteTransportCompany'
import useConfirmModal from '../../hooks/useConfirmModal'
import { useState } from 'react'

const TransportAdminDashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, error } = useGetTransportCompanies()
  const deleteTransportCompanyMutation = useDeleteTransportCompanyMutation()
  const toast = useToast()

  const { openConfirmModal, ConfirmModal } = useConfirmModal()

  const navigate = useNavigate()

  const [targetCompanyId, setTargetCompanyId] = useState<string>('')

  const deleteCompany = () => {
    deleteTransportCompanyMutation.mutate(targetCompanyId, {
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Transport company was deleted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  const handleOnRowClick = (id: string) => {
    navigate(`${routes.TRANSPORT_COMPANIES}/${id}`)
  }

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout className='bg-blue-50'>
      <ConfirmModal
        title='Delete transport company'
        description='Are you sure you want to delete this transport company?'
        onConfirm={deleteCompany}
      />

      <AddEditTransportCompanyModal
        isOpen={isOpen}
        onClose={onClose}
      />

      <div className='flex w-full justify-end'>
        <Card className='mb-6 w-min'>
          <Button
            colorScheme='whatsapp'
            onClick={onOpen}
            name='add-transport-company-button'
          >
            Add new company
          </Button>
        </Card>
      </div>
      <Card>
        <Skeleton isLoaded={!isLoading}>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone number</Th>
                  <Th>Number of vehicles</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((transportCompany) => (
                  <Tr
                    key={transportCompany.id}
                    onClick={() => handleOnRowClick(transportCompany.id)}
                    className='cursor-pointer hover:bg-gray-100'
                  >
                    <Td>{transportCompany.name}</Td>
                    <Td>{transportCompany.email}</Td>
                    <Td>{transportCompany.phoneNumber}</Td>
                    <Td>{transportCompany.transportVehicles.length}</Td>
                    <Td>
                      <Tooltip
                        label='Kompanija se ne može obrisati zato što ima vozila u floti.'
                        isDisabled={transportCompany.transportVehicles.length === 0}
                      >
                        <Button
                          size={'sm'}
                          fontWeight={'semibold'}
                          colorScheme='red'
                          isDisabled={transportCompany.transportVehicles.length > 0}
                          onClick={(e) => {
                            e.stopPropagation()
                            setTargetCompanyId(transportCompany.id)
                            openConfirmModal()
                          }}
                        >
                          Remove
                        </Button>
                      </Tooltip>
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

export default TransportAdminDashboardPage
