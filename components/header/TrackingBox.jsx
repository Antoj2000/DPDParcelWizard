import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "@/constants/colors";
export default function TrackingBox({ value, onChangeText, onSubmit }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search tracking number..."
          placeholderTextColor="#777"
          inputMode="numeric"
          keyboardType="number-pad"
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
          maxLength={9}
          onSubmitEditing={onSubmit}
          style={styles.input}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dpdRed,
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 12,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: {
    fontSize: 15,
    color: "#000",
  },
});
