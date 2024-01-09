import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import { getTransportCompanies } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'

type TransportCompany = {
  id: string
  name: string
  email: string
  phoneNumber: string
  transportVehiclesIds: string[]
}

const AllTransportCompaniesPage = () => {
  const { data, isLoading, error } = useQuery<TransportCompany[]>({
    queryKey: ['transport-companies'],
    queryFn: getTransportCompanies,
  })

  const navigate = useNavigate()

  const handleOnRowClick = (id: string) => {
    navigate(`${routes.TRANSPORT_COMPANIES}/${id}`)
  }

  if (isLoading) return <span>Loading....</span>

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout className='bg-blue-50'>
      <div className='w-full flex justify-end'>
        <Card className='w-min mb-6'>
          <Button colorScheme='whatsapp'>Add new company</Button>
        </Card>
      </div>
      <Card>
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
                    >
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </SidebarLayout>
  )
}

export default AllTransportCompaniesPage
