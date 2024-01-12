import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import SidebarLayout from '../../components/SidebarLayout'
import { useGetPatients } from '../../hooks/useGetPatients'
import Card from '../../components/Card'

const UserAdminDashboard = () => {
  const { data, isLoading, error } = useGetPatients()

  console.log(data)

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout>
      <Card>
        <Skeleton isLoaded={!isLoading}>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>First name</Th>
                  <Th>Last name</Th>
                  <Th>Phone number</Th>
                  <Th>Email</Th>
                  <Th>PIN</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((patient) => (
                  <Tr
                    key={patient.id}
                    //TODO on click
                  >
                    <Td>{patient.firstName}</Td>
                    <Td>{patient.lastName}</Td>
                    <Td>{patient.phoneNumber}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.pin}</Td>
                    //TODO delete patient
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

export default UserAdminDashboard
