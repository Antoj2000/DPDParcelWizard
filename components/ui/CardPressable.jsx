import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";

export default function CardPressable({ children, onPress }) {
  return (
    <View style={styles.outerCardContainer}>
      <Pressable style={styles.innerCardContainer} onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCardContainer: {
    width: "100%",
    height: 150,
    borderColor: Colors.dpdRed,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: Colors.bgCard,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
  },
  innerCardContainer: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: Colors.bgCard,
  },
});
