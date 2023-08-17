import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
