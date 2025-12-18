import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/colors";

export default function QuickActionsButton({ children }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={styles.buttonInnerContainer} >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    flex: 1,
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: "hidden",
    borderColor: Colors.dpdRed,
    borderWidth: 1,
  },

  buttonInnerContainer: {
    backgroundColor: Colors.bg500,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.75,
  },
});
