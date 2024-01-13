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
import SidebarLayout from '../../components/SidebarLayout'
import AddPatientModal from '../../components/AddPatientModal'
import { useGetPatients } from '../../hooks/useGetPatients'
import { useDeletePatientMutation } from '../../hooks/useDeletePatient'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'

const PatientAdminDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, error } = useGetPatients()
  const deletePatientMutation = useDeletePatientMutation()

  const toast = useToast()

  const navigate = useNavigate()

  const handleDeletePatientButtonClick = (id: string) => {
    deletePatientMutation.mutate(id, {
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
    navigate(`${routes.USERS.DASHBOARD}/${id}`)
  }

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout>
      <AddPatientModal
        isOpen={isOpen}
        onClose={onClose}
      />

      <div className='w-full flex justify-end'>
        <Card className='w-min mb-6'>
          <Button
            colorScheme='whatsapp'
            onClick={onOpen}
          >
            Add new patient
          </Button>
        </Card>
      </div>

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
                    onClick={() => handleOnRowClick(patient.id)}
                  >
                    <Td>{patient.firstName}</Td>
                    <Td>{patient.lastName}</Td>
                    <Td>{patient.phoneNumber}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.pin}</Td>
                    <Td>
                      <Button
                        size={'sm'}
                        fontWeight={'semibold'}
                        colorScheme='red'
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePatientButtonClick(patient.id)
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

export default PatientAdminDashboard
