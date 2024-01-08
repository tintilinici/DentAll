import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import SidebarLayout from '../../components/SidebarLayout'
import { getTransportCompanyDetails } from '../../lib/api'

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

  if (isLoading) return <span>Loading....</span>

  return (
    <SidebarLayout className='bg-blue-50'>
      {error ? <Card>{error.message}</Card> : <Card>{data && JSON.stringify(data)}</Card>}
    </SidebarLayout>
  )
}

export default TransportCompanyDetailsPage
