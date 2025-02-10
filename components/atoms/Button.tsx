import colors from 'tailwindcss/colors';
import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

interface IButtonProps {
    label: string;
    variant: 'primary' | 'secondary';
}

export function Button({ variant, ...props }: IButtonProps & TouchableOpacityProps) {
    if (variant === 'primary') {
        return (
            <TouchableOpacity {...props} className='px-6 py-2.5 bg-white rounded-full'>
                <Text className='text-slate-600 font-medium'>{props.label}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity {...props} className='px-6 py-2.5 rounded-full border-[0.5px]' style={{ borderColor: `${colors.white}fff50` }}>
            <Text className='text-neutral-200 font-medium'>{props.label}</Text>
        </TouchableOpacity>
    )
}