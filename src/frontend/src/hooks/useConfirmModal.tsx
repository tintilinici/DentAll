import { useState } from 'react'
import ConfirmModal, { ConfirmModalProps } from '../components/_ConfirmModal'

interface UseConfirmModalProps {
  defaultIsOpen?: boolean
}

const useConfirmModal = ({ defaultIsOpen = false }: UseConfirmModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const openConfirmModal = () => {
    setIsOpen(true)
  }

  const closeConfirmModal = () => {
    setIsOpen(false)
  }

  return {
    openConfirmModal,
    closeConfirmModal,
    ConfirmModal: (props: Omit<ConfirmModalProps, 'isOpen' | 'onClose'>) => (
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeConfirmModal}
        {...props}
      />
    ),
  }
}

export default useConfirmModal
