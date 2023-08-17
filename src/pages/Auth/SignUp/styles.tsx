import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "##EEEEEE",
    height: "100%",
  },
  textHeaderContainer: {
    paddingTop: 163,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 33,
    textAlign: "center",
  },
  paragraph: {
    paddingVertical: 10,
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 22.5,
    textAlign: "center",
  },
  formContainer: {
    paddingVertical: 40,
  },
  buttonContainer: {
    paddingTop: 10,
  },
  signInRedirectContainer: {
    paddingTop: 5,
    paddingBottom: 20,
    marginHorizontal: "auto",
    flexDirection: "row",
    gap: 5,
  },
  signInRedirectText: {
    fontSize: 15,
    lineHeight: 22.5,
    fontWeight: "600",
  },
});

export default styles;
