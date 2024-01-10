import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import { getTransportCompanyDetails } from '../../lib/api'
import { Button, Skeleton } from '@chakra-ui/react'

type TransportCompany = {
  id: string
  name: string
  email: string
  phoneNumber: string
  transportVehiclesIds: string[]
}

const TransportCompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useQuery<TransportCompany>({
    queryKey: ['transpor-company-details', id],
    queryFn: () => getTransportCompanyDetails(id),
    retry: false,
  })

  return (
    <SidebarLayout className='bg-blue-50'>
      {error ? (
        <Card>{error.message}</Card>
      ) : (
        <>
          <div className='w-full flex justify-end'>
            <Card className='w-min mb-6'>
              <Button colorScheme='whatsapp'>Add vehicle</Button>
            </Card>
          </div>
          <Card>
            <Skeleton isLoaded={!isLoading}>{data?.name}</Skeleton>
          </Card>
        </>
      )}
    </SidebarLayout>
  )
}

export default TransportCompanyDetailsPage
