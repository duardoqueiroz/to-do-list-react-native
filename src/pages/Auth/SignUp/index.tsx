import { View, Text, SafeAreaView, Button, Image } from "react-native";
import CustomButton from "../../../components/Button";
import styles from "./styles";
import FormInput from "../../../components/FormInput";
import TextButton from "../../../components/TextButton";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormError from "../../../components/FormError";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../../../services/firebase";

interface NavigationProps {
  navigation: any;
  route: any;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O Nome é obrigatório!"),
  email: Yup.string()
    .required("O Email é obrigatório!")
    .email("Email inválido!"),
  password: Yup.string()
    .required("A Senha é obrigatória!")
    .min(6, "A Senha deve ter no mínimo 6 caracteres!"),
  confirmPassword: Yup.string()
    .required("A Confirmação de Senha é obrigatória!")
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais!"),
});

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = ({ navigation, route }: NavigationProps) => {
  const handleOnSubmit = async (values: FormValues) => {
    try {
      const db = getFirestore(app);
      await setDoc(doc(db, "users", values.email), {
        name: values.name,
        email: values.email,
      });
      const auth = getAuth();
      const credentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(credentials.user, {
        displayName: values.name,
      });
      navigation.navigate("SignIn");
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
                label={"Full name"}
                placeholder={"Mary Elliot"}
                onChangeText={handleChange("name")}
                value={values.name}
              ></Field>
              {errors.name ? (
                <FormError message={errors.name}></FormError>
              ) : null}
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
              <Field
                component={FormInput}
                label={"Confirm Password"}
                secureTextEntry={true}
                placeholder={"***********"}
                onChangeText={handleChange("confirmPassword")}
                values={values.confirmPassword}
              ></Field>
              {errors.confirmPassword ? (
                <FormError message={errors.confirmPassword}></FormError>
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
      <View style={styles.signInRedirectContainer}>
        <Text style={styles.signInRedirectText}>Already have an account ?</Text>
        <TextButton
          text="Sign In"
          onPress={() => navigation.navigate("SignIn")}
          style={styles.signInRedirectText}
        ></TextButton>
      </View>
    </View>
  );
};

export default SignUp;
