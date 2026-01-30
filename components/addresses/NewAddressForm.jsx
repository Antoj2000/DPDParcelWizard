import { StyleSheet, Text, View, Modal, Button } from "react-native";
import Input from "../ui/Input";

export default function NewAddressForm({ onCancel }) {
  return (
    <Modal animationType="slide">
      <View style={styles.form}>
        <Text style={styles.title}>New Address</Text>
        <Input label="Title" />
        <Input label="Address Line 1" />
        <Input label="Address Line 2" />
        <Input label="Address Line 3" />
        <Input label="Address Line 4" />
        <Input label="Eircode" />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel} title="Cancel" />
        {/* <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button> */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 10 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
