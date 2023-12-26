import React from "react";
import {
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label: string;
  isChecked: boolean;
  onPressCheck: () => void;
}

export default function Check(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPressCheck} style={styles.checks}>
      <Ionicons
        name={props.isChecked ? "checkbox-outline" : "square-outline"}
        size={24}
        color={props.isChecked ? "blue" : "black"}
      />

      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checks: {
    flexDirection: "row",
    alignItems: "center",
  },
});
