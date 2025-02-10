import { View } from "react-native";
import { ToggleButton } from "../atoms";
import { useEffect, useState } from "react";

export interface IFilterButton {
    label: string,
    value: string,
}

interface FiltersProps {
    active?: string,
    onChange: (value: string) => void,
    buttons: IFilterButton[]
}

export function Filters({ buttons, onChange, active }: FiltersProps) {

    const [selected, setSelected] = useState<string | null>(active ? active : buttons[0].value);

    useEffect(() => {
        if (selected && selected !== active) {
            onChange(selected);
        }
    }, [selected]);

  return (
    <View className="flex-row gap-1.5 my-4 mx-auto">
        {buttons.map((button, index) => {
            return <ToggleButton active={selected === button.value} key={index} label={button.label} onPress={() => setSelected(button.value)} />
        })}
    </View>
  );
}