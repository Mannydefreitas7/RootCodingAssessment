import * as Notifications from 'expo-notifications';
import socketService, { SocketService } from './socket.service';
import { Notification } from '@/types';

// Mocked Notification
import { generateRandomMockNotification } from '@/store/mock'
import { Audio } from 'expo-av';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


class NotificationService {

    permissionStatus: Notifications.NotificationPermissionsStatus | null = null;
    socketService: SocketService;
    sound: Audio.Sound | null = null;

    constructor(private _socketService: SocketService) { 
        this.checkPermissions();
        this.socketService = _socketService;
     }

    private checkPermissions = async () => {
        const status = await Notifications.getPermissionsAsync();
        if (status.status !== 'granted') this.permissionStatus = await Notifications.requestPermissionsAsync();
    }

    private playSound = async () => {
        try {
            const { sound: notification } = await Audio.Sound.createAsync(require('./../assets/audio/sound.mp3'));
            this.sound = notification;
            await this.sound.playAsync();
        } catch (error) {
            console.log('Error playing sound', error);
        }
    }

    pushNotification = async (notification: Notification) => {
        if (this.permissionStatus?.status === 'granted') {
            try {
                await Notifications.scheduleNotificationAsync({
                        content: {
                            title: notification.title,
                            data: notification,
                        },
                        trigger: {
                            type: Notifications.SchedulableTriggerInputTypes.DATE,
                            date: notification.date,
                    }
                })
            } catch (error) {
                console.log('Error scheduling notification', error);
            }
        }
    }


    scheduleNotification = async (date: Date) => {
            const notification = generateRandomMockNotification();
           
            const now = new Date().getTime();
            const targetTime = new Date(date).getTime();
            const delay = targetTime - now;
            
            if (delay >= 0) {
                setTimeout(() => {
                    this.playSound();
                    this.socketService.send('send_notification', {
                        event: 'send_notification',
                        payload: {
                            ...notification,
                            date
                        } as Notification
                    });
                }, delay);
            }
            
            await this.pushNotification(notification);

            try {
                await this.sound?.unloadAsync();
            } catch (error) {
                console.log('Error unloading sound', error);
            }
    }
}

const notificationService = new NotificationService(socketService);
export default notificationService; 