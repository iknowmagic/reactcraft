import { create } from 'zustand'

interface ModalState {
  /**
   * Set of currently open modal IDs
   */
  openModals: Set<string>

  /**
   * Check if a modal is open
   */
  isOpen: (_id: string) => boolean

  /**
   * Open a modal
   */
  openModal: (_id: string) => void

  /**
   * Close a modal
   */
  closeModal: (_id: string) => void
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModals: new Set<string>(),

  isOpen: (id: string) => {
    return get().openModals.has(id)
  },

  openModal: (id: string) => {
    set((state) => {
      const updatedModals = new Set(state.openModals)
      updatedModals.add(id)
      return { openModals: updatedModals }
    })
  },

  closeModal: (id: string) => {
    set((state) => {
      const updatedModals = new Set(state.openModals)
      updatedModals.delete(id)
      return { openModals: updatedModals }
    })
  },
}))
