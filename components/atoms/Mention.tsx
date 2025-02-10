import { StyleProp, Text, TextStyle, View } from "react-native";
import colors from "tailwindcss/colors";

interface MentionProps {
    label: string;
    type: 'person' | 'channel' | 'workspace';
    style?: StyleProp<TextStyle>
}

export function Mention({ label, type, style }: MentionProps) {
    
    if (type === 'channel') return <View className="flex-row items-center"><Text className="text-white p-1 rounded font-medium capitalize text-sm" style={[{ backgroundColor: `${colors.orange[500]}40` }, style]}>#{label}</Text><Text className="text-white font-bold">.</Text></View>
    if (type === 'person') return <Text className="text-white font-medium p-1 rounded text-sm" style={[{ backgroundColor: `${colors.white}fff15` }, style]}>@{label}</Text>

    return (
        <Text className="text-white font-medium p-1 rounded text-sm" style={[{ backgroundColor: `${colors.green[500]}50` }, style]}>{label}</Text>
    )
}