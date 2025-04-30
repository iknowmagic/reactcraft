import { ReactNode } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  /**
   * Unique ID for the modal
   */
  id: string

  /**
   * Modal title shown in the header
   */
  title?: string

  /**
   * Content to be displayed in the modal body
   */
  children: ReactNode

  /**
   * Size of the modal
   * @default 'md'
   */
  size?: ModalSize

  /**
   * Custom footer content
   * If not provided, a default close button will be shown
   */
  footer?: ReactNode

  /**
   * Whether to show the close button in the header
   * @default true
   */
  showCloseButton?: boolean

  /**
   * Whether to close the modal when clicking outside
   * @default true
   */
  closeOnOverlayClick?: boolean

  /**
   * Whether to close the modal when pressing ESC key
   * @default true
   */
  closeOnEsc?: boolean

  /**
   * Callback function when modal is closed
   */
  onClose?: () => void
}
