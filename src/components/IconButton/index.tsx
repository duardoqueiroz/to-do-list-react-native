import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles";

interface ButtonProps {
  name: string;
  onPress: () => void;
}

const IconButton = ({ onPress, name }: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Icon style={styles.icon} name={name}></Icon>
    </Pressable>
  );
};

export default IconButton;
