import type { Meta, StoryObj } from '@storybook/react'
import ThemeToggle from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
