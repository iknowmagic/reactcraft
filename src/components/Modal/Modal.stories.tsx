import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'

// Component wrapper for the stories to control modal state
const ModalDemo = ({ id, title, children, ...props }: any) => {
  const { openModal } = useModalStore()

  return (
    <div className="p-4">
      <button
        className="btn btn-primary"
        onClick={() => openModal(id)}
        data-testid="open-modal-button"
      >
        Open Modal
      </button>

      <Modal id={id} title={title} {...props}>
        {children}
      </Modal>
    </div>
  )
}

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    id: 'default-modal',
    title: 'Modal Title',
    children: (
      <div>
        <p>This is the default modal with standard settings.</p>
        <p className="mt-4">
          It has a title, standard size, and default close button.
        </p>
      </div>
    ),
  },
  render: (args) => <ModalDemo {...args} />,
}

export const SmallSize: Story = {
  args: {
    id: 'small-modal',
    title: 'Small Modal',
    size: 'sm',
    children: <p>This is a small modal with less content.</p>,
  },
  render: (args) => <ModalDemo {...args} />,
}

export const LargeSize: Story = {
  args: {
    id: 'large-modal',
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p>This is a large modal with more content to display.</p>
        <p className="mt-4">
          It&apos;s useful for forms or detailed information that requires more
          space.
        </p>
        <div className="bg-base-200 mt-4 p-4 rounded-lg">
          <p>
            You can include more complex content here such as forms, tables, or
            images.
          </p>
        </div>
      </div>
    ),
  },
  render: (args) => <ModalDemo {...args} />,
}

export const CustomFooter: Story = {
  args: {
    id: 'custom-footer-modal',
    title: 'Custom Footer Modal',
    children: <p>This modal has custom action buttons in the footer.</p>,
    footer: (
      <div className="flex justify-end gap-2">
        <button className="btn-outline btn">Cancel</button>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    ),
  },
  render: (args) => <ModalDemo {...args} />,
}

export const NoTitle: Story = {
  args: {
    id: 'no-title-modal',
    children: (
      <p>This modal has no title, just content and the close button.</p>
    ),
  },
  render: (args) => <ModalDemo {...args} />,
}

export const FormModal: Story = {
  render: () => {
    // Local state for form
    const FormModalDemo = () => {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const { openModal, closeModal } = useModalStore()
      const modalId = 'form-modal'

      const handleSubmit = () => {
        alert(`Submitted: ${name}, ${email}`)
        closeModal(modalId)
      }

      return (
        <div className="p-4">
          <button
            className="btn btn-primary"
            onClick={() => openModal(modalId)}
          >
            Open Form Modal
          </button>

          <Modal
            id={modalId}
            title="Contact Form"
            footer={
              <div className="flex justify-end gap-2">
                <button
                  className="btn-outline btn"
                  onClick={() => closeModal(modalId)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!name || !email}
                >
                  Submit
                </button>
              </div>
            }
          >
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input-bordered w-full input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="mt-4 label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-bordered w-full input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Modal>
        </div>
      )
    }

    return <FormModalDemo />
  },
}
