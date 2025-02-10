import { FriendRequestNotification, InviteNotification, MentionNotification, Notification, NotificationType } from "@/types/notification";
import { StyleProp, Text, TextStyle, TouchableOpacity, View } from "react-native";
import { Button, IconSymbol, Mention } from "../atoms";
import { Image } from 'expo-image';
import colors from "tailwindcss/colors";
import ReactTimeAgo, { useTimeAgo } from "react-time-ago";
import { formatDate } from "date-fns"
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useRef } from "react";

function Wrapper({ item, onPress, children }: { item: Notification, onPress?: () => void, children?: React.ReactNode }) {
    const swipeableRef = useRef<SwipeableMethods>(null);
    return (
        <Swipeable
            ref={swipeableRef}
            friction={1.5}
            renderRightActions={(progress, drag, swipeable) => (
                <TouchableOpacity className="h-full justify-center items-center" style={{ backgroundColor: item.read ? colors.gray[700] : colors.blue[700], width: 100 }} onPress={() => {
                    if (onPress) onPress()
                    swipeable.close()
                }}>
                    <IconSymbol name={item.read ? 'xmark.circle' : 'checkmark.circle'} color={colors.white} size={24} />
                    <Text className="text-white text-sm font-semibold">{item.read ? 'Unread' : 'Read'}</Text>
                </TouchableOpacity>
            )}
        >
            <TouchableOpacity activeOpacity={1} className="flex-row items-start gap-5 p-4 bg-slate-800" onPress={() => { swipeableRef.current?.openRight() }}>
                <View className="h-10 w-10 justify-center items-center rounded-lg" style={{ backgroundColor: item.read ? colors.gray[500] : colors.indigo[500] }}>
                    <Image source={require('@/assets/images/root_logo.png')} style={{ width: 18, height: 18 }} />
                </View>
                <View>{children}</View>
            </TouchableOpacity>
        </Swipeable>
    )
}

function Time({ children }: { children: React.ReactNode }) {
    return <Text className="text-slate-500 text-sm font-semibold">{children}</Text>
}

const notificationType = (Component: typeof Wrapper,  item: Notification, type: NotificationType, onPress?: () => void) => {
    const result = useTimeAgo({ date: item.read ?? new Date(), locale: 'en-US', timeStyle: 'mini'});
    const statusStyle: StyleProp<TextStyle> = { fontWeight: item.read ? 'normal' : 'bold', fontStyle: item.read ? 'normal' : 'italic' }
    const renderMentionNotification = () => {
        const workspace = (item as MentionNotification).workspace;
      
        return (<Component item={item} onPress={onPress}>
            <View className="flex-row items-center">
                <Mention label={item.from} type='person' style={statusStyle} />
                <Text className="text-neutral-200" style={statusStyle}> mentioned you in </Text>
                {workspace.channels && workspace.channels.length > 0 && <Mention label={workspace.channels[0].name} type='channel' style={statusStyle} />}
                {workspace && <Mention label={workspace.name} type='workspace' style={statusStyle} />}
            </View>
            <View className="flex-row items-center gap-1 mt-1">
                <ReactTimeAgo date={item.date} locale={'en-US'} component={Time} /><Text className="text-slate-500 text-sm font-semibold" style={{ opacity: item.read ? 1 : 0 }}>| Read {result && formatDate(result.date, 'h:mm aaa')}</Text>
            </View>
            
        </Component>)
    }

    const renderFriendRequestNotification = () => {

        if ((item as FriendRequestNotification).status === 'pending') {
            return (<Component item={item} onPress={onPress}>
                <View className="flex-row items-center mb-0.5">
                    <Mention label={item.from} type='person' style={statusStyle} />
                    <Text className="text-neutral-200" style={statusStyle}> sent you a friend request</Text>
                </View>
                <View className="flex-row items-center gap-1 mt-1">
                    <ReactTimeAgo date={item.date} locale={'en-US'} component={Time} /><Text className="text-slate-500 text-sm font-semibold" style={{ opacity: item.read ? 1 : 0 }}>| Read {result && formatDate(result.date, 'h:mm aaa')}</Text>
                </View>
                <View className="flex-row items-center gap-2 mt-2">
                    <Button variant='primary' label="Accept" />
                    <Button variant='secondary' label="Decline" />
                </View>
            </Component>)
        }

        return (<Component item={item} onPress={onPress}>
            <View className="flex-row items-center">
                <Mention label={item.from} type='person' style={statusStyle} />
                {(item as FriendRequestNotification).status === 'accepted' ? <Text className="text-green-500 font-medium" style={statusStyle}> accepted</Text> : <Text className="text-red-500 font-medium" style={statusStyle}> declined</Text>}<Text className="text-neutral-100" style={statusStyle}> your friend request</Text>
            </View>
            <View className="flex-row items-center gap-1 mt-1">
                    <ReactTimeAgo date={item.date} locale={'en-US'} component={Time} /><Text className="text-slate-500 text-sm font-semibold" style={{ opacity: item.read ? 1 : 0 }}>| Read {result && formatDate(result.date, 'h:mm aaa')}</Text>
                </View>
        </Component>)
    }

    const renterInviteNotification = () => {
        const workspace = (item as MentionNotification).workspace;
        return (<Component item={item} onPress={onPress}>
            <View className="flex-row items-center">
                <Mention label={item.from} type='person' style={statusStyle} />
                <Text className="text-neutral-300" style={statusStyle}> invited you to </Text>
                <Mention label={workspace.name} type='workspace' style={statusStyle} />
            </View>
            <View className="flex-row items-center gap-1 mt-1">
                <ReactTimeAgo date={item.date} locale={'en-US'} component={Time} /><Text className="text-slate-500 text-sm font-semibold" style={{ opacity: item.read ? 1 : 0 }}>| Read {result && formatDate(result.date, 'h:mm aaa')}</Text>
            </View>
        </Component>)
    }

    const renderItem = () => {
        switch (type) {
            case 'mention':
                return renderMentionNotification()
            case 'friend_request':
                return renderFriendRequestNotification()
            case 'invite':
                return renterInviteNotification()
        }
    }

    return renderItem()
}

const MentionNotificationItem = ({ item, onPress }: { item: MentionNotification, onPress?: () => void }) => notificationType(Wrapper, item, 'mention', onPress);
const FriendRequestNotificationItem = ({ item, onPress }: { item: FriendRequestNotification, onPress?: () => void }) => notificationType(Wrapper, item, 'friend_request', onPress);
const InviteNotificationItem = ({ item, onPress }: { item: InviteNotification, onPress?: () => void }) => notificationType(Wrapper, item, 'invite', onPress);

export const NotificationItem = ({ item, onPress }: { item: Notification, onPress?: () => void }) => {
    switch (item.type) {
        case 'mention':
            return <MentionNotificationItem item={item as MentionNotification} onPress={onPress} />
        case 'friend_request':
            return <FriendRequestNotificationItem item={item as FriendRequestNotification} onPress={onPress} />
        case 'invite':
            return <InviteNotificationItem item={item as InviteNotification} onPress={onPress} />
    }
}