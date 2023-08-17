import { Pressable, Text } from "react-native";
import styles from "./styles";

interface TextButtonProps {
  text: string;
  onPress: () => void;
  style?: object;
}

const TextButton = ({ text, style, onPress }: TextButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ ...styles.text, ...style }}>{text}</Text>
    </Pressable>
  );
};

export default TextButton;
