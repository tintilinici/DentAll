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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import SidebarLayout from '../../components/SidebarLayout'
import AddPatientModal from '../../components/AddPatientModal'
import { useGetPatients } from '../../hooks/useGetPatients'
import { useDeletePatientMutation } from '../../hooks/useDeletePatient'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'

const PatientAdminDashboard = () => {
  const {
    isOpen: isAddPatientModalOpen,
    onOpen: onAddPatientModalOpen,
    onClose: onAddPatientModalClose,
  } = useDisclosure()
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()

  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const [selectedPatientId, setSelectedPatientId] = React.useState<string | null>(null)

  const { data, isLoading, error } = useGetPatients()
  const deletePatientMutation = useDeletePatientMutation()

  const toast = useToast()

  const navigate = useNavigate()

  const handleDeletePatientButtonClick = (id: string) => {
    onAlertOpen()
    setSelectedPatientId(id)
  }

  const confirmDeletePatient = () => {
    if (selectedPatientId) {
      deletePatientMutation.mutate(selectedPatientId, {
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
      onAlertClose()
    }
  }

  const handleOnRowClick = (id: string) => {
    navigate(`${routes.USERS.DASHBOARD}/${id}`)
  }

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout>
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={onAddPatientModalClose}
      />

      <div className='w-full flex justify-end'>
        <Card className='w-min mb-6'>
          <Button
            colorScheme='whatsapp'
            onClick={onAddPatientModalOpen}
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
                        Delete
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
              Delete Patient
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onAlertClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={confirmDeletePatient}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </SidebarLayout>
  )
}

export default PatientAdminDashboard