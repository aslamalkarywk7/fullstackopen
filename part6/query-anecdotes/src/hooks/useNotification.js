import { useContext, useRef } from 'react'
import NotificationContext from '../NotificationContext'

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const [, setNotification] = useContext(NotificationContext)
  const timeoutRef = useRef(null)

  return (message) => {
    setNotification(message)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
}
