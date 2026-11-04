import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    notify: (message) => {
      set(() => ({ message }))
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => set(() => ({ message: '' })), 5000)
    },
  },
}))

export const useNotificationMessage = () =>
  useNotificationStore((state) => state.message)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)

export default useNotificationStore
