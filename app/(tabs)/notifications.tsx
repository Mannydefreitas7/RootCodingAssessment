import { Filters, type IFilterButton, ListHeaderDate, NotificationItem, Screen } from "@/components";
import { useState } from "react";
import { SectionList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { store, useAppDispatch } from "@/store";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useNotifications } from "@/hooks";
import { toggleStatus } from "@/reducers/notification";

// Configure the reanimated logger
// Setting strict to false to avoid unnecessary warnings
// See https://docs.swmansion.com/react-native-reanimated/docs/installation#logging for more detail
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

/*
  Method below is used to display the time format for the notification
  See https://www.npmjs.com/package/react-time-ago for more detail
*/
TimeAgo.addLocale(en)

const filters: IFilterButton[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Mentions',
    value: 'mention'
  },
  {
    label: 'Friend requests',
    value: 'friend_request'
  },
  {
    label: 'Invites',
    value: 'invite'
  }
]

export default function NotificationsScreen() {
  const [selected, setSelected] = useState(filters[0].value);
  const { bottom } = useSafeAreaInsets()
  const { notifications } = useNotifications(store)
  const dispatch = useAppDispatch()

  return ( 
    <Screen>
        <View className="w-full h-0.5 bg-black opacity-100" />
        <Filters active={selected} onChange={(value) => {
          setSelected(value)
        }} buttons={filters}/>
        <View className="w-full h-0.5 bg-white opacity-5" />
        <SectionList 
          keyExtractor={(item, index) => item.id + index} 
          sections={notifications}
          showsVerticalScrollIndicator={false}
          contentInset={{ bottom: bottom * 3 }}
          renderItem={({item, index}) => (<NotificationItem key={index} item={item} onPress={() => dispatch(toggleStatus(item))} />)}
          renderSectionHeader={({section: {title}}) => <ListHeaderDate date={title} />}
        />
    </Screen>
  );
}


