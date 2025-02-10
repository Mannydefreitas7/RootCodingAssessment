import { mock_notifications } from '@/store/mock';
import { Notification } from '@/types/notification';
import { createSlice } from '@reduxjs/toolkit'

export interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: mock_notifications
}

export const KEY = 'notification';

export const notificationSlice = createSlice({
  name: KEY,
  initialState: initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    toggleStatus: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload.id)
      if (index > -1) {
        state.notifications[index].read = new Date()
      }
    }
  }
})

// Export the generated action creators for use in components
export const { addNotification, toggleStatus } = notificationSlice.actions

// Export the slice reducer for use in the store configuration
export default notificationSlice.reducer