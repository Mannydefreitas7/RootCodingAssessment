import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";


export function TabBarHeader({ options, paddingTop }: BottomTabHeaderProps & { paddingTop: number }) {

    return (
        <View style={{ paddingTop }} className="pb-4 dark:bg-slate-950">
            <Text className="dark:text-white font-bold text-xl text-center">{options.title}</Text>
        </View>
    )
}