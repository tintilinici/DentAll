import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import {
  Button,
  Heading,
  Skeleton,
  Table,
  TableContainer,
  Thead,
  Tr,
  useDisclosure,
  Th,
  Tbody,
  Td,
  Tag,
  TagLabel,
  useToast,
  HStack,
} from '@chakra-ui/react'
import { useGetTransportCompanyDetails } from '../../hooks/useGetTransportCompanyDetails'
import AddTransportVehicleModal from '../../components/AddTransportVehicleModal'
import { getVehicleTagColor } from '../../constants/vehicleTagColor'
import { useDeleteTransportVehicle } from '../../hooks/useDeleteTransportVehicle'
import useConfirmModal from '../../hooks/useConfirmModal'
import AddEditTransportCompanyModal from '../../components/AddEditTransportCompanyModal'

const TransportCompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: companyData, error, isLoading } = useGetTransportCompanyDetails(id || '')
  const deleteTransportVehicleMuation = useDeleteTransportVehicle(id || '')

  const {
    isOpen: isOpenAddVehicle,
    onClose: onCloseAddVehicle,
    onOpen: onOpenAddVehicle,
  } = useDisclosure()
  const {
    isOpen: isOpenEditData,
    onClose: onCloseEditData,
    onOpen: onOpenEditData,
  } = useDisclosure()
  const toast = useToast()

  const { openConfirmModal, ConfirmModal } = useConfirmModal()

  const deleteVehicle = (vehicleId: string) => {
    deleteTransportVehicleMuation.mutate(vehicleId, {
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
          description: 'Vehicle deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  if (id === undefined) {
    return (
      <SidebarLayout className='bg-blue-50'>
        <Card>Company id not provided</Card>
      </SidebarLayout>
    )
  }

  return (
    <SidebarLayout className='bg-blue-50'>
      {error || !companyData ? (
        <Card>{error ? error.message : 'Data for company not avalible'}</Card>
      ) : (
        <>
          <AddTransportVehicleModal
            companyId={id}
            isOpen={isOpenAddVehicle}
            onClose={onCloseAddVehicle}
          />

          <div className='flex w-full justify-end'>
            <Card className='mb-6 w-min'>
              <HStack gap='4'>
                <Button
                  colorScheme='whatsapp'
                  variant={'outline'}
                  onClick={onOpenEditData}
                >
                  Edit data
                </Button>
                <Button
                  colorScheme='whatsapp'
                  onClick={onOpenAddVehicle}
                >
                  Add vehicle
                </Button>
              </HStack>
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
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr className='cursor-pointer hover:bg-gray-100'>
                      <Td>{companyData.name}</Td>
                      <Td>{companyData.email}</Td>
                      <Td>{companyData.phoneNumber}</Td>
                      <Td>{companyData.transportVehicles.length}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Heading
                size={'md'}
                color='gray.600'
                mt='10'
                mb='5'
                ml={5}
              >
                {companyData.transportVehicles.length > 0 ? (
                  'Vehicles'
                ) : (
                  <>
                    {'This company has no vehicles. '}
                    <span
                      className='cursor-pointer text-green-500 hover:text-green-600'
                      onClick={onOpenAddVehicle}
                    >
                      Add one.
                    </span>
                  </>
                )}
              </Heading>

              {companyData.transportVehicles.length > 0 ? (
                <>
                  <TableContainer mt='10'>
                    <Table variant={'simple'}>
                      <Thead>
                        <Tr>
                          <Th>Type of vehicle</Th>
                          <Th>Capacity</Th>
                          <Th>Remove</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {companyData.transportVehicles.map((vehicleData) => (
                          <Tr
                            key={vehicleData.id}
                            className='hover:bg-gray-100'
                          >
                            <Td>
                              <Tag
                                size='lg'
                                bgColor={getVehicleTagColor(vehicleData.transportVehicleType)}
                              >
                                <TagLabel>
                                  {vehicleData.transportVehicleType.toLocaleLowerCase()}
                                </TagLabel>
                              </Tag>
                            </Td>
                            <Td>{vehicleData.capacity}</Td>
                            <Td>
                              <Button
                                size={'sm'}
                                fontWeight={'semibold'}
                                colorScheme='red'
                                onClick={openConfirmModal}
                              >
                                Remove
                              </Button>
                            </Td>
                            <ConfirmModal
                              title={'Brisanje vozila'}
                              description={'Jeste li sigurni da želite obrisati ovo vozilo?'}
                              onConfirm={() => deleteVehicle(vehicleData.id)}
                            />
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </>
              ) : null}
            </Skeleton>
          </Card>
        </>
      )}
      <AddEditTransportCompanyModal
        isOpen={isOpenEditData}
        onClose={onCloseEditData}
        data={companyData}
      />
    </SidebarLayout>
  )
}

export default TransportCompanyDetailsPage
