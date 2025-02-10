
export type NotificationType = 'mention' | 'friend_request' | 'invite';
export enum NotificationTitle {
    MENTION = 'You have been mentioned in',
    FRIEND_REQUEST = 'You have a new friend request',
    INVITE = 'You have been invited to join',
}

interface INotification {
    id: string;
    title: NotificationTitle;
    type: NotificationType;
    html?: string;
    read?: Date;
    date: Date;
}

export interface MentionNotification extends INotification {
    workspace: Workspace;
    from: string;
}

export interface FriendRequestNotification extends INotification {
    from: string;
    status: 'pending' | 'accepted' | 'declined',
}

export interface InviteNotification extends INotification {
    from: string;
    title: NotificationTitle.INVITE;
    workspace: Workspace;
}

interface Workspace {
    id: string;
    name: string;
    channels?: Channel[];
}

interface Channel {
    id: string;
    name: string;
}

export type Notification = InviteNotification | MentionNotification | FriendRequestNotification;
export interface NofiticationBySection {
        title: string;
        date: Date;
        data: Notification[];
}