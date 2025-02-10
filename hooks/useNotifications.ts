import { NotificationState } from "@/reducers/notification";
import { socketService } from "@/services";
import { createSelector, Store } from "@reduxjs/toolkit";
import { isToday, isWithinInterval, isAfter, addWeeks, isThisWeek, isYesterday } from "date-fns"
import { groupBy } from "lodash";
import uuid from 'react-native-uuid';
import { useAppSelector } from "@/store";

const today = new Date();
  
  const sectionDateText = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else if (isThisWeek(date)) {
      return 'This week';
    } else if (isWithinInterval(date, { start: addWeeks(today, -1), end: addWeeks(today, -2) })) {
      return 'Last week';
    } else {
      return 'Older';
    }
  }

export const useNotifications = (store: Store) => {

    const startListening = () => {
        socketService.listen('receive_notification', (payload) => { 
            store.dispatch({ type: 'notification/addNotification', payload: payload.payload })
        })
    }

    const stopListening = () => socketService.stop('receive_notification')

    const selectNotifications = (state: NotificationState) => state.notifications
    const mapWithSections = createSelector([selectNotifications], (notifications) => {
        return notifications
            .map((item) => ({
                ...item, 
                date: new Date(item.date),
                id: uuid.v4(),
                section: sectionDateText(item.date)
            }))
            .sort((a, b) => isAfter(b.date, a.date) ? 1 : -1)
    })
    const groupedBySections = createSelector([mapWithSections], (notifications) => groupBy(notifications, 'section'))
    const sortedNotifications = createSelector([groupedBySections], (grouped) => Object.keys(grouped).map((section) => ({
        title: section,
        data: grouped[section]
    })).sort((a, b) => isAfter(b.data[0].date, a.data[0].date) ? 1 : -1))
    const count = useAppSelector((state) => state.notification.notifications.filter(n=> !n.read).length)
    const notifications = sortedNotifications(store.getState().notification)

    return { count, notifications, startListening, stopListening }
 }