import { Notification } from './notification';

export type SocketEventType = 'receive_notification' | 'send_notification';
export interface SocketPayload {
    event: SocketEventType;
    payload: Notification | string;
}