import SidebarLayout from '../../components/SidebarLayout'
import { useGetPatients } from '../../hooks/useGetPatients'

const UserAdminDashboard = () => {
  const { data } = useGetPatients()

  console.log(data)

  return (
    <SidebarLayout>
      <h1>all users table here</h1>
    </SidebarLayout>
  )
}

export default UserAdminDashboard
