import { StyleSheet, Text, View } from "react-native";
import CardPressable from "../../components/ui/CardPressable";
import NewAddressForm from "../../components/addresses/NewAddressForm"

export default function Calendar() {
  function pressHandler () {
    console.log("Card Pressed");
  }
  return (
    <View style={styles.rootContainer}>
      <NewAddressForm />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    margin: 12,
    justifyContent: "center",
  }
});
