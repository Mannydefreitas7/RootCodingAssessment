import { Text, View } from "react-native";
import { BlurView } from 'expo-blur';

interface ListHeaderDateProps {
    date: string;
}

export function ListHeaderDate({ date }: ListHeaderDateProps) {

    return (
        <BlurView intensity={70} className="bg-slate-950 px-3 pt-3 pb-2">
            <Text className="text-slate-500 font-medium">{date}</Text>
        </BlurView>
    );
}