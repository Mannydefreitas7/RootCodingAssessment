import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { IconSymbol, TabBarBackground, TabBarHeader } from '@/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotifications } from "@/hooks"
import { notificationService } from '@/services';
import { store } from '@/store';
import { addMinutes } from 'date-fns';

export default function TabLayout() {
   const { top: paddingTop } = useSafeAreaInsets()
   const { count, startListening, stopListening } = useNotifications(store)

   useEffect(() => {
      startListening()
      return () => stopListening()
   }, [])

   useEffect(() => {
      const now = new Date();
      notificationService.scheduleNotification(now)
      // Schedule a random notification 1 min from now
      notificationService.scheduleNotification(addMinutes(now, 1))
      // Schedule a random notification 3 min from now
      notificationService.scheduleNotification(addMinutes(now, 3))
      // Schedule a random notification 5 min from now
      notificationService.scheduleNotification(addMinutes(now, 5))
   }, [])


  return ( 
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: true,
        header: (props) => <TabBarHeader {...props} paddingTop={paddingTop} />,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0, 
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? "house.fill" : "house"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? "person.fill" : "person"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? "message.fill" : "message"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        
        options={{
          title: 'Notifications',
          tabBarBadge: count > 0 ? count : undefined,
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? "bell.fill" : "bell"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? "person.fill" : "person"} color={color} />,
        }}
      />
    </Tabs>
  );
}
