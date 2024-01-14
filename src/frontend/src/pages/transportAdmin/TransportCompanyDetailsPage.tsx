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
} from '@chakra-ui/react'
import { useGetTransportCompanyDetails } from '../../hooks/useGetTransportCompanyDetails'
import AddTransportVehicleModal from '../../components/AddTransportVehicleModal'
import { getVehicleTagColor } from '../../constants/vehicleTagColor'
import { useDeleteTransportVehicle } from '../../hooks/useDeleteTransportVehicle'

const TransportCompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: companyData, error, isLoading } = useGetTransportCompanyDetails(id || '')
  const deleteTransportVehicleMuation = useDeleteTransportVehicle(id || '')

  const { isOpen, onClose, onOpen } = useDisclosure()
  const toast = useToast()

  const handleDeleteVehicleButtonClick = (vehicleId: string) => {
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
            isOpen={isOpen}
            onClose={onClose}
          />
          <div className='flex w-full justify-end'>
            <Card className='mb-6 w-min'>
              <Button
                colorScheme='whatsapp'
                onClick={onOpen}
              >
                Add vehicle
              </Button>
            </Card>
          </div>
          <Skeleton isLoaded={!isLoading}>
            <Card>
              <Heading
                size='lg'
                mb={8}
                color='gray.600'
              >
                {companyData.name}
              </Heading>
              <TableContainer>
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
                        // onClick={() => handleOnRowClick(vehicleData.id)}
                        className='cursor-pointer hover:bg-gray-100'
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
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteVehicleButtonClick(vehicleData.id)
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
            </Card>
          </Skeleton>
        </>
      )}
    </SidebarLayout>
  )
}

export default TransportCompanyDetailsPage
