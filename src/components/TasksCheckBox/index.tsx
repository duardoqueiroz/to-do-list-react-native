import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "./styles";
import { useState } from "react";

interface TasksCheckBoxProps {
  task: string;
  checked: boolean;
  onValueChange: () => Promise<void>;
}

const TasksCheckBox = ({
  checked,
  task,
  onValueChange,
}: TasksCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <View style={styles.container}>
      <Checkbox
        onValueChange={async () => {
          await onValueChange();
          setIsChecked(!isChecked);
        }}
        color={isChecked ? "#56C5B6" : undefined}
        value={isChecked}
      />
      <Text style={styles.text}>{task}</Text>
    </View>
  );
};

export default TasksCheckBox;
