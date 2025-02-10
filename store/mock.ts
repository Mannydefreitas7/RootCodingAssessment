import { Notification, NotificationTitle, NotificationType } from "@/types";
import uuid from 'react-native-uuid'

export const mock_notifications: Notification[] = [
    {
        id: uuid.v4(),
        title: NotificationTitle.MENTION,
        type: 'mention',
        read: new Date(),
        date: new Date(2025, 0, 12),
        workspace: {
            id: uuid.v4(),
            name: 'Root',
            channels: [
                {
                    id: '1',
                    name: 'general'
                }
            ]
        },
        from: 'John'
    },
    {
        id: uuid.v4(),
        title: NotificationTitle.FRIEND_REQUEST,
        type: 'friend_request',
        read: new Date(),
        date: new Date(),
        from: 'John Doe',
        status: 'pending'
    },
    {
        id: uuid.v4(),
        title: NotificationTitle.FRIEND_REQUEST,
        type: 'friend_request',
        date: new Date(2025, 1, 6),
        from: 'John Doe',
        read: new Date(),
        status: 'accepted'
    },
    {
        id: uuid.v4(),
        title: NotificationTitle.INVITE,
        type: 'invite',
        date: new Date(2025, 0, 28),
        read: new Date(),
        from: 'John Doe',
        workspace: {
            id: uuid.v4(),
            name: 'Root'
        }
    },
]

const persons = ['John', 'Mary', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
const notificationTypes : NotificationType[] = ['mention', 'friend_request', 'invite'];
const workspaceNames = ['Root', 'Workspace', 'Gaming', 'Development', 'Design', 'Marketing', 'Sales', 'Support', 'Management', 'HR', 'Finance'];
const channelNames = ['general', 'random', 'off-topic', 'news', 'announcements', 'events', 'jobs', 'help', 'feedback', 'suggestions'];


export function generateRandomMockNotification(): Notification {

    const date = new Date();

    const randomNotificationTypeIndex = Math.floor(Math.random() * notificationTypes.length);
    const randomWorkspaceIndex = Math.floor(Math.random() * workspaceNames.length);
    const randomChannelIndex = Math.floor(Math.random() * channelNames.length);
    const randomPersonIndex = Math.floor(Math.random() * persons.length);

    const randomNotificationType = notificationTypes[randomNotificationTypeIndex];
    const randomWorkspaceName = workspaceNames[randomWorkspaceIndex];
    const randomChannelName = channelNames[randomChannelIndex];
    const randomPerson = persons[randomPersonIndex];

    const title = randomNotificationType === 'mention' ? NotificationTitle.MENTION : randomNotificationType === 'friend_request' ? NotificationTitle.FRIEND_REQUEST : NotificationTitle.INVITE

    const notification: Notification = {
        id: uuid.v4(),
        title,
        type: randomNotificationType,
        date,
        workspace: {
            id: uuid.v4(),
            name: randomWorkspaceName,
            channels: [
                {
                    id: uuid.v4(),
                    name: randomChannelName
                }
            ]
        },
        status: randomNotificationType === 'friend_request' ? 'pending' : randomNotificationType === 'invite' ? 'accepted' : undefined,
        from: randomPerson
    }

    return notification;
}