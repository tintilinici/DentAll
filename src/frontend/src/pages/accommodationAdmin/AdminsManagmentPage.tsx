import SidebarLayout from '../../components/SidebarLayout'
import {
  Button,
  HStack,
  Skeleton,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Card from '../../components/Card.tsx'
import { useGetUsers } from '../../hooks/useGetAdmins.ts'
import { useDeleteAdminMutation } from '../../hooks/useDeleteAdmin.ts'
import AddAdminModal from '../../components/AddAdminModal.tsx'
import { User } from '../../lib/api.types.ts'
import { useState } from 'react'
import EditAdminModal from '../../components/EditAdminModal.tsx'
import useConfirmModal from '../../hooks/useConfirmModal.tsx'

const AdminsManagmentPage = () => {
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

  const { data: allUsers, isLoading, error } = useGetUsers()
  const [user, setUser] = useState<User>({
    email: '',
    roles: [],
    createdAt: '',
  })

  const deleteAdminMutation = useDeleteAdminMutation()
  const toast = useToast()

  const { openConfirmModal, ConfirmModal } = useConfirmModal()
  const [targetEmail, setTargetEmail] = useState<string>('')

  const deleteAdmin = () => {
    if (targetEmail === 'admin@admin.com') return
    deleteAdminMutation.mutate(targetEmail, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Admin deleted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setUser({
          email: '',
          roles: [],
          createdAt: '',
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

  if (error) return <span>{error.message}</span>

  return (
    <SidebarLayout>
      <div className='flex w-full justify-end'>
        <Card className='mb-6 w-min'>
          <Button
            colorScheme='whatsapp'
            onClick={onOpenAdd}
          >
            Add admin
          </Button>
        </Card>
      </div>
      <Card>
        <Skeleton isLoaded={!isLoading}>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>Created at</Th>
                  <Th>Roles</Th>
                  <Th>Edit</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allUsers?.map((singleUser) => (
                  <Tr
                    key={singleUser.email}
                    className='hover:bg-gray-100'
                  >
                    <Td>{singleUser.email}</Td>
                    <Td>{new Date(singleUser.createdAt).toLocaleDateString('hr-HR')}</Td>
                    <Td>
                      <HStack spacing={4}>
                        {singleUser.roles.sort().map((e, index) => (
                          <Tag
                            colorScheme='cyan'
                            key={index}
                          >
                            {e.replace('ROLE_', '').toLowerCase()}
                          </Tag>
                        ))}
                      </HStack>
                    </Td>
                    <Td>
                      <Button
                        size='sm'
                        colorScheme='whatsapp'
                        onClick={() => {
                          setUser(singleUser)
                          onOpenEdit()
                        }}
                      >
                        Edit
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        size={'sm'}
                        fontWeight={'semibold'}
                        colorScheme='red'
                        onClick={(e) => {
                          e.stopPropagation()
                          setTargetEmail(singleUser.email)
                          openConfirmModal()
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
        </Skeleton>
      </Card>

      <AddAdminModal
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
      />
      <EditAdminModal
        currentUser={user}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
      />
      <ConfirmModal
        title='Brisanje administratora'
        description='Jeste li sigurni da želite obrisati ovog administratora?'
        onConfirm={deleteAdmin}
      />
    </SidebarLayout>
  )
}

export default AdminsManagmentPage
