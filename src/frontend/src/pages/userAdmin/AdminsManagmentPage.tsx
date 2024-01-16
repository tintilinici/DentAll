import SidebarLayout from '../../components/SidebarLayout'
import {
    Button, Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
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
import { useDeleteAdminMutation } from "../../hooks/useDeleteAdmin.ts";
import * as React from "react";
import { usePatchAdmin } from "../../hooks/usePatchAdmin.ts";
import {useEffect, useState} from "react";
import {User} from "../../lib/api.types.ts";
import AddEditAdminModal from "../../components/AddEditAdminModal.tsx";

const AdminsManagmentPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isLoading, error } = useGetUsers()
    const [ allUsers, setAllUsers ] = useState<User[]>([])
    const [user, setUser] = useState<{email: string, roles: string[]}>({
        email: '',
        roles: []
    });

    const deleteAdminMutation = useDeleteAdminMutation()
    const toast = useToast()

    useEffect(() => {
        setAllUsers(data)
    }, [data]);

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

    const handleOnRowClick = (email: string, roles: string[]) => {
        setUser({email, roles: roles.map(e => e.replace('ROLE_', ''))})
        onOpen();
    }

    const handleClose = () => {
        setUser({
            email: '',
            roles: [],
            password: ''
        });
        onClose();
    };

    if (error) return <span>{error.message}</span>

    return (
        <SidebarLayout className='bg-blue-50'>

            <div className='w-full flex justify-end'>
                <Card className='w-min mb-6'>
                    <Button
                        colorScheme='whatsapp'
                        onClick={onOpen}
                    >Add admin</Button>
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
                                    <Th>Remove</Th>
                                </Tr>
                            </Thead>
                            <Tbody className="row-hover">
                                {allUsers?.map((singleUser) => (
                                    <Tr
                                        key={singleUser.email}
                                        className="hover:bg-gray-100"
                                        onClick={() => handleOnRowClick(singleUser.email, singleUser.roles)}
                                    >
                                        <Td>{singleUser.email}</Td>
                                        <Td>
                                            {new Date(singleUser.createdAt).toLocaleDateString('hr-HR')}
                                        </Td>
                                        <Td>
                                            <Flex flexWrap="wrap" gap="10px">
                                            {singleUser.roles.map((e, index) => (
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
                                                    handleDeleteAdmin(singleUser.email)
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
            <AddEditAdminModal
                data={user}
                isOpen={isOpen}
                onClose={handleClose}
            />
        </SidebarLayout>
    )
}

export default AdminsManagmentPage
