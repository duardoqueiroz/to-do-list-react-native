import { View, Text, SafeAreaView, Button, Image } from "react-native";
import CustomButton from "../../../components/Button";
import styles from "./styles";
import FormInput from "../../../components/FormInput";
import TextButton from "../../../components/TextButton";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormError from "../../../components/FormError";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../services/firebase";

interface NavigationProps {
  navigation: any;
  route: any;
}

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("O Email é obrigatório!")
    .email("Email inválido!"),
  password: Yup.string()
    .required("A Senha é obrigatória!")
    .min(6, "A Senha deve ter no mínimo 6 caracteres!"),
});

const initialValues: FormValues = {
  email: "",
  password: "",
};

const SignIn = ({ navigation, route }: NavigationProps) => {
  const handleOnSubmit = async (values: FormValues) => {
    try {
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      navigation.navigate("Tasks", { user: credentials.user });
    } catch (error) {
      console.log(error);
    }
  };

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
        source={require("../../../../assets/shape.png")}
      ></Image>
      <View style={styles.textHeaderContainer}>
        <Text style={styles.title}>Welcome Onboard!</Text>
        <Text style={styles.paragraph}>
          Lets help you in completing your tasks
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <View style={styles.formContainer}>
              <Field
                component={FormInput}
                label={"Email"}
                placeholder={"mary.elliot@mail.com"}
                onChangeText={handleChange("email")}
                values={values.email}
              ></Field>
              {errors.email ? (
                <FormError message={errors.email}></FormError>
              ) : null}
              <Field
                component={FormInput}
                label={"Password"}
                secureTextEntry={true}
                placeholder={"***********"}
                onChangeText={handleChange("password")}
                values={values.password}
              ></Field>
              {errors.password ? (
                <FormError message={errors.password}></FormError>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                text={"Register"}
                onPress={() => {
                  handleSubmit();
                }}
              ></CustomButton>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.signUpRedirectContainer}>
        <Text style={styles.signUpRedirectText}>Don't have an account ?</Text>
        <TextButton
          text="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
          style={styles.signUpRedirectText}
        ></TextButton>
      </View>
    </View>
  );
};

export default SignIn;
