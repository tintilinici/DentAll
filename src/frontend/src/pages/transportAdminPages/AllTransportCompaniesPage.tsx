import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import routes from '../../constants/routes'
import { getTransportCompanies } from '../../lib/api'

type TransportCompany = {
  id: string
  name: string
  email: string
  phoneNumber: string
  transportVehiclesIds: string[]
}

const AllTransportCompaniesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new transport company</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder='First name'
                type='text'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Last name'
                type='email'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder='Last name'
                type='number'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter className='space-x-2'>
            <Button
              onClick={onClose}
              variant={'outline'}
              colorScheme='red'
              w={'full'}
            >
              Cancel
            </Button>
            <Button
              colorScheme='green'
              mr={3}
              w={'full'}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
