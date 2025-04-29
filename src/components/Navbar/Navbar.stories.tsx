import type { Meta, StoryObj } from '@storybook/react'
import Navbar from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
