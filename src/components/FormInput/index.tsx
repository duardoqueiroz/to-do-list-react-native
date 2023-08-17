import { TextInput, View, Text } from "react-native";
import styles from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

const FormInput = ({
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.textInput}
        value={value}
      ></TextInput>
    </View>
  );
};

export default FormInput;
