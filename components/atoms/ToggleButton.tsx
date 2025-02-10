import { Text, TouchableOpacity, View } from "react-native";

interface ToggleButtonProps {
    label: string,
    active: boolean,
    onPress: () => void
}

export function ToggleButton({ label, active, onPress }: ToggleButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} className={`rounded-lg ${active ? 'bg-blue-600' : 'bg-gray-700'}`}>
            <View className={`py-1.5 px-4`}>
                <Text className={`text-base font-medium ${active ? 'dark:text-white' : 'dark:text-neutral-300'} `}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}