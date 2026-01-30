import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Input from "../ui/Input";

export default function NewAddressForm({ onCancel }) {
  return (
    <Modal animationType="slide">
      <KeyboardAvoidingView style={styles.screen} behavior="padding">
        <ScrollView>
          <View style={styles.form}>
            <Text style={styles.title}>New Address</Text>
            <Input label="Title" placeholder="Enter address title" />
            <Input label="Address Line 1" placeholder="50 Valleycourt" />
            <Input label="Address Line 2" placeholder="Bunnavalley" />
            <Input label="Address Line 3" placeholder="Athlone" />
            <Input label="Address Line 4" placeholder="Westmeath" />
            <Input label="Eircode" placeholder="Enter Eircode" />
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={onCancel} title="Cancel" />
          {/* <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button> */}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    marginTop: 30,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
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
