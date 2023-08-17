import { Text, View } from "react-native";
import styles from "./styles";

interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.messaage}>{message}</Text>
    </View>
  );
};

export default FormError;
