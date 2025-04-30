import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { useModalStore } from '@/store/modalStore'
import type { ModalProps } from './Modal.types'

const getSizeClass = (size: ModalProps['size']) => {
  switch (size) {
    case 'sm':
      return 'max-w-sm'
    case 'lg':
      return 'max-w-3xl'
    case 'md':
    default:
      return 'max-w-lg'
  }
}

export const Modal: React.FC<ModalProps> = ({
  id,
  title,
  children,
  size = 'md',
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  onClose,
}) => {
  const { isOpen, closeModal } = useModalStore()
  const modalOpen = isOpen(id)

  const handleClose = useCallback(() => {
    closeModal(id)
    onClose?.()
  }, [closeModal, id, onClose])

  // Handle ESC key press
  useEffect(() => {
    if (!closeOnEsc || !modalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeOnEsc, handleClose, modalOpen])

  // Setup for accessibility
  useEffect(() => {
    if (modalOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  return (
    <AnimatePresence>
      {modalOpen && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? `modal-title-${id}` : undefined}
          data-testid="modal"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeOnOverlayClick ? handleClose : undefined}
            data-testid="modal-overlay"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`modal-box w-full ${getSizeClass(size)} relative z-50`}
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-content"
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex justify-between items-center mb-4">
                {title && (
                  <h3 className="font-bold text-lg" id={`modal-title-${id}`}>
                    {title}
                  </h3>
                )}

                {showCloseButton && (
                  <button
                    className="btn btn-sm btn-ghost btn-circle"
                    onClick={handleClose}
                    aria-label="Close modal"
                    data-testid="modal-close-button"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="py-2">{children}</div>

            {/* Footer */}
            {footer !== undefined && <div className="mt-6">{footer}</div>}

            {/* Default footer if none provided */}
            {footer === undefined && (
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={handleClose}
                  data-testid="modal-default-close"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal
