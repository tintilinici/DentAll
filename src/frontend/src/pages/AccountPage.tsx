import Card from '../components/Card'
import SidebarLayout from '../components/SidebarLayout'
import { useAuth } from '../components/auth/useAuth'

const AccountPage = () => {
  const { getFullName } = useAuth()
  return (
    <SidebarLayout>
      <Card>
        <div>Hello: {getFullName()}</div>
      </Card>
    </SidebarLayout>
  )
}

export default AccountPage
