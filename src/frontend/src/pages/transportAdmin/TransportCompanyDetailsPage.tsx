import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import { Button, Skeleton } from '@chakra-ui/react'
import { useGetTransportCompanyDetails } from '../../hooks/useGetTransportCompanyDetails'

const TransportCompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading } = useGetTransportCompanyDetails(id || '')

  return (
    <SidebarLayout className='bg-blue-50'>
      {error || !data ? (
        <Card>{error ? error.message : 'Data for company not avalible'}</Card>
      ) : (
        <>
          <div className='w-full flex justify-end'>
            <Card className='w-min mb-6'>
              <Button colorScheme='whatsapp'>Add vehicle</Button>
            </Card>
          </div>
          <Card>
            <Skeleton isLoaded={!isLoading}>{data.name}</Skeleton>
          </Card>
        </>
      )}
    </SidebarLayout>
  )
}

export default TransportCompanyDetailsPage
