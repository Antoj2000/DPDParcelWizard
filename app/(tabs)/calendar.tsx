import { StyleSheet, Text, View } from "react-native";
import CardPressable from "../../components/ui/CardPressable";

export default function Calendar() {
  function pressHandler () {
    console.log("Card Pressed");
  }
  return (
    <View style={styles.rootContainer}>
      <CardPressable onPress={pressHandler}>
        <Text>Hi</Text>
      </CardPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    margin: 12,
    justifyContent: "center",
  }
});
