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
import AddTransportCompanyModal from '../../components/AddTransportCompanyModal'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import routes from '../../constants/routes'
import { useGetTransportCompanies } from '../../hooks/useGetTransportCompanies'
import { useDeleteTransportCompanyMutation } from '../../hooks/useDeleteTransportCompany'

export type TransportCompany = {
  id: string
  name: string
  email: string
  phoneNumber: string
  transportVehiclesIds: string[]
}

const AllTransportCompaniesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, error } = useGetTransportCompanies()
  const deleteTransportCompanyMutation = useDeleteTransportCompanyMutation()
  const toast = useToast()

  const navigate = useNavigate()

  const handleDeleteCompanyButtonClick = (id: TransportCompany['id']) => {
    deleteTransportCompanyMutation.mutate(id, {
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
    navigate(`${routes.TRANSPORT_COMPANIES}/${id}`)
  }

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout className='bg-blue-50'>
      <AddTransportCompanyModal
        isOpen={isOpen}
        onClose={onClose}
      />

      <div className='w-full flex justify-end'>
        <Card className='w-min mb-6'>
          <Button
            colorScheme='whatsapp'
            onClick={onOpen}
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
                  >
                    <Td>{transportCompany.name}</Td>
                    <Td>{transportCompany.email}</Td>
                    <Td>{transportCompany.phoneNumber}</Td>
                    <Td>{transportCompany.transportVehiclesIds.length}</Td>
                    <Td>
                      <Button
                        size={'sm'}
                        fontWeight={'semibold'}
                        colorScheme='red'
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCompanyButtonClick(transportCompany.id)
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

export default AllTransportCompaniesPage
