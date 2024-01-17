import React from 'react'
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
import AddAccommodationOrderModal from '../../components/AddAccommodationOrderModal'
import { useGetPatients } from '../../hooks/useGetPatients'
import { useDeletePatientMutation } from '../../hooks/useDeletePatient'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'
import useConfirmModal from '../../hooks/useConfirmModal'

const PatientAdminDashboard = () => {
  const {
    isOpen: isAddPatientModalOpen,
    onOpen: onAddPatientModalOpen,
    onClose: onAddPatientModalClose,
  } = useDisclosure()

  const {
    isOpen: isAddAccommodationOrderModalOpen,
    onOpen: onAddAccommodationOrderModalOpen,
    onClose: onAddAccommodationOrderModalClose,
  } = useDisclosure()

  // const [isAccommodationOrderModalOpen, setIsAccommodationOrderModalOpen] = React.useState<{
  //   [key: string]: boolean
  // }>({})

  const { data, isLoading, error } = useGetPatients()
  const deletePatientMutation = useDeletePatientMutation()

  const toast = useToast()
  const navigate = useNavigate()

  // const handleAddOrderButtonClick = (id: string) => {
  //   // Set the modal state for the specific patient to true
  //   setIsAccommodationOrderModalOpen((prevState) => ({ ...prevState, [id]: true }))
  // }

  // const onCloseAccommodationOrderModal = (id: string) => {
  //   // Set the modal state for the specific patient to false
  //   setIsAccommodationOrderModalOpen((prevState) => ({ ...prevState, [id]: false }))
  // }

  const { openConfirmModal, ConfirmModal } = useConfirmModal()

  const deletePatient = (patientId: string) => {
    deletePatientMutation.mutate(patientId, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Patient deleted successfully.',
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

  const handleOnRowClick = (id: string) => {
    navigate(`${routes.USERS.DASHBOARD}/orders/${id}`)
  }

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout className='bg-blue-50'>
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={onAddPatientModalClose}
      />

      <div className='flex w-full justify-end'>
        <Card className='mb-6 w-min'>
          <Button
            colorScheme='whatsapp'
            onClick={onAddPatientModalOpen}
          >
            Add patient
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
                  <Th>Add accommodation order</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((patient) => (
                  <Tr
                    key={patient.id}
                    onClick={() => handleOnRowClick(patient.id)}
                    className='cursor-pointer hover:bg-gray-100'
                  >
                    <Td>{patient.firstName}</Td>
                    <Td>{patient.lastName}</Td>
                    <Td>{patient.phoneNumber}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.pin}</Td>
                    <Td>
                      <AddAccommodationOrderModal
                        isOpen={isAddAccommodationOrderModalOpen}
                        onClose={onAddAccommodationOrderModalClose}
                        patientId={patient.id}
                        orderId={''}
                      />
                      <Button
                        colorScheme='whatsapp'
                        size='sm'
                        onClick={(e) => {
                          e.stopPropagation()
                          onAddAccommodationOrderModalOpen()
                        }}
                      >
                        Add accommodation order
                      </Button>
                    </Td>
                    <Td>
                      <Button
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
                    <ConfirmModal
                      title='Brisanje pacijenta'
                      description='Jeste li sigurni da želite obrisati pacijenta?'
                      onConfirm={() => deletePatient(patient.id)}
                    />
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
