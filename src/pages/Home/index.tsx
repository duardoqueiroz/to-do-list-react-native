import { View, Text, Image } from "react-native";
import styles from "./styles";
import Button from "../../components/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../services/firebase";
interface HomeProps {
  navigation: any;
}

const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 254,
          height: 228,
        }}
        source={require("../../../assets/shape.png")}
      ></Image>
      {/* IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/home-undraw.png")}
        ></Image>
      </View>
      {/* TITLE AND TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Get things done with TODO</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere
          gravida purus id eu condimentum est diam quam. Condimentum blandit
          diam.
        </Text>
      </View>
      {/* BUTTON */}
      <View style={styles.buttonContainer}>
        <Button
          text="Get Started"
          onPress={() => {
            const auth = getAuth(app);
            onAuthStateChanged(auth, (user) => {
              if (user) {
                navigation.navigate("Tasks", { user });
              } else {
                navigation.navigate("SignUp");
              }
            });
          }}
        ></Button>
      </View>
    </View>
  );
};

export default Home;
