import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Modal from './Modal'
import { useModalStore } from '@/store/modalStore'

// Mock framer-motion to avoid issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

describe('Modal', () => {
  beforeEach(() => {
    // Reset modal store state before each test
    const { closeModal } = useModalStore.getState()
    closeModal('test-modal')
  })

  it('should not render when closed', () => {
    render(
      <Modal id="test-modal" title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    )

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should render when opened', () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    render(
      <Modal id="test-modal" title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    )

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('should close when clicking the close button', async () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    const onCloseMock = vi.fn()

    render(
      <Modal id="test-modal" title="Test Modal" onClose={onCloseMock}>
        <p>Modal content</p>
      </Modal>,
    )

    await userEvent.click(screen.getByTestId('modal-close-button'))

    expect(onCloseMock).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should close when clicking outside if closeOnOverlayClick is true', async () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    render(
      <Modal id="test-modal" title="Test Modal" closeOnOverlayClick={true}>
        <p>Modal content</p>
      </Modal>,
    )

    await userEvent.click(screen.getByTestId('modal-overlay'))

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should not close when clicking outside if closeOnOverlayClick is false', async () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    render(
      <Modal id="test-modal" title="Test Modal" closeOnOverlayClick={false}>
        <p>Modal content</p>
      </Modal>,
    )

    await userEvent.click(screen.getByTestId('modal-overlay'))

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  it('should close when pressing ESC if closeOnEsc is true', () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    render(
      <Modal id="test-modal" title="Test Modal" closeOnEsc={true}>
        <p>Modal content</p>
      </Modal>,
    )

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should render custom footer when provided', () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    const customFooter = (
      <div>
        <button data-testid="custom-button">Custom Button</button>
      </div>
    )

    render(
      <Modal id="test-modal" title="Test Modal" footer={customFooter}>
        <p>Modal content</p>
      </Modal>,
    )

    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-default-close')).not.toBeInTheDocument()
  })

  it('should apply the correct size class', () => {
    const { openModal } = useModalStore.getState()
    openModal('test-modal')

    render(
      <Modal id="test-modal" title="Test Modal" size="lg">
        <p>Modal content</p>
      </Modal>,
    )

    const modalContent = screen.getByTestId('modal-content')
    expect(modalContent).toHaveClass('max-w-3xl')
  })
})
