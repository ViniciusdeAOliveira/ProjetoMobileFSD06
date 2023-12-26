import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonView: {
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  loginButton: {
    padding: 10,
    backgroundColor: "#6059FF",
    borderRadius: 8,
    alignItems: "center",
  },
  exitButton: {
    padding: 10,
    backgroundColor: "#FF4747",
    borderRadius: 8,
    alignItems: "center",
  },
});
