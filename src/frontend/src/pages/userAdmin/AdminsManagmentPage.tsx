import SidebarLayout from '../../components/SidebarLayout'
import {
    Button, Flex,
    Skeleton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import Card from "../../components/Card.tsx";
import { useGetUsers } from "../../hooks/useGetAdmins.ts";
import {useDeleteAdminMutation} from "../../hooks/useDeleteAdmin.ts";

const AdminsManagmentPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isLoading, error } = useGetUsers()
    const deleteAdminMutation = useDeleteAdminMutation()
    const toast = useToast()

    const handleDeleteAdmin = (id: string) => {
        deleteAdminMutation.mutate(id, {
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
        <SidebarLayout className='bg-blue-50'>

            <Card>
                <Skeleton isLoaded={!isLoading}>
                    <TableContainer>
                        <Table variant={'simple'}>
                            <Thead>
                                <Tr>
                                    <Th>Email</Th>
                                    <Th>Created at</Th>
                                    <Th>Roles</Th>
                                    <Th>Remove</Th>
                                </Tr>
                            </Thead>
                            <Tbody className="row-hover">
                                {data?.map((user) => (
                                    <Tr
                                        key={user.email}
                                        className="hover:bg-gray-100"
                                    >
                                        <Td>{user.email}</Td>
                                        <Td>
                                            {new Date(user.createdAt).toLocaleDateString('hr-HR')}
                                        </Td>
                                        <Td>
                                            <Flex flexWrap="wrap" gap="10px">
                                            {user.roles.map((e, index) => (
                                                <div className={e.replace("ROLE_", "").toLowerCase()} key={index}>
                                                    {e.replace("ROLE_", "").toLowerCase()}
                                                </div>
                                            ))}
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Button
                                                size={'sm'}
                                                fontWeight={'semibold'}
                                                colorScheme='red'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteAdmin(user.email)
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
        </SidebarLayout>
    )
}

export default AdminsManagmentPage
