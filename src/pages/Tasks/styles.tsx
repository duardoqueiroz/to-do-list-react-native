import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "##EEEEEE",
  },
  headerContainer: {
    flex: 1,
    backgroundColor: "#62D2C3",
    height: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 33,
    paddingVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageContainer: {
    paddingTop: 40,
    marginHorizontal: "auto",
  },
  clockImage: {
    width: 127.08,
    height: 126.57,
  },
  tasksListContainer: {
    flex: 1,
    padding: 20,
  },
  tasksTitle: {
    color: "#000000E5",
    paddingVertical: 10,
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 33,
  },
  tasksContainer: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  tasksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tasksHeaderText: {
    color: "#000000CC",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 25.5,
  },
  tasksItemsContainer: {
    flex: 1,
    paddingVertical: 10,
    overflow: "scroll",
  },
});

export default styles;
