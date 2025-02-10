import { Slot } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import your global CSS file
import "../global.css";
import { Provider } from 'react-redux'
import { store } from "@/store";

const AppLayout = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView>
                <Slot />
            </GestureHandlerRootView>
        </Provider>
    );
}

export default AppLayout;
