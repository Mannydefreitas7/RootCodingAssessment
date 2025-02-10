import { Text } from 'react-native';
import { Screen } from '@/components';

export default function HomeScreen() {
  return (
    <Screen className="flex-1 items-center justify-center">
        <Text className='text-3xl font-bold dark:text-white'>Home</Text>
    </Screen>
  );
}
