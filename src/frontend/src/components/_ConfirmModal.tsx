import {
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

export interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description: string
  onClose: () => void
  onConfirm: () => void
  onCancel?: () => void
}

// Dont' use this component directly, use useConfirmModal hook instead
// this is just a helper component for that hook
const ConfirmModal = (props: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{props.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='green'
            variant={'outline'}
            name='cacnel'
            mr={3}
            onClick={() => {
              props.onClose()
              props.onCancel && props.onCancel()
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme='red'
            name='confirm'
            onClick={() => {
              props.onClose()
              props.onConfirm()
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
