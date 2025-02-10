import { StyleProp, View, ViewProps } from "react-native"

export function Screen({ children, ...props }: ViewProps) {
    return <View {...props} className={`flex-1 bg-slate-50 dark:bg-slate-900 ${props.className}`} >
        {children}
    </View>
}