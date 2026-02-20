import { useState } from "react";
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

export default function NewAddressForm({ onCancel, onSubmit, initialValues }) {
  const [inputValues, setInputValues] = useState({
    title: initialValues?.title || "",
    line1: initialValues?.line1 || "",
    line2: initialValues?.line2 || "",
    line3: initialValues?.line3 || "",
    line4: initialValues?.line4 || "",
    eircode: initialValues?.eircode || "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    if (
      !inputValues.title.trim() ||
      !inputValues.line1.trim() ||
      !inputValues.line4.trim() ||
      !inputValues.eircode.trim()
    ) {
      return;
    }
    onSubmit({
      ...inputValues,
      eircode: inputValues.eircode.trim().toUpperCase(),
    });
  }

  return (
    <Modal animationType="slide">
      <KeyboardAvoidingView
        // style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <ScrollView>
          <View style={styles.form}>
            <Text style={styles.title}>New Address</Text>
            <Input
              label="Title"
              placeholder="Enter address title"
              textInputConfig={{
                onChangeText: (value) => inputChangedHandler("title", value),
                value: inputValues.title,
              }}
            />
            <Input
              label="Address Line 1"
              placeholder="50 Valleycourt"
              textInputConfig={{
                onChangeText: (value) => inputChangedHandler("line1", value),
                value: inputValues.line1,
              }}
            />
            <Input
              label="Address Line 2"
              placeholder="Bunnavalley"
              textInputConfig={{
                onChangeText: (value) => inputChangedHandler("line2", value),
                value: inputValues.line2,
              }}
            />
            <Input
              label="Address Line 3"
              placeholder="Athlone"
              textInputConfig={{
                onChangeText: (value) => inputChangedHandler("line3", value),
                value: inputValues.line3,
              }}
            />
            <Input
              label="Address Line 4"
              placeholder="Westmeath"
              textInputConfig={{
                onChangeText: (value) => inputChangedHandler("line4", value),
                value: inputValues.line4,
              }}
            />
            <Input
              label="Eircode"
              placeholder="Enter Eircode"
              textInputConfig={{
                onChangeText: (value) => inputChangedHandler("eircode", value),
                value: inputValues.eircode,
                autoCapitalize: "characters",
                maxLength: 7,
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <Button onPress={onCancel} title="Cancel" />
          <Button onPress={submitHandler} title="Save" />
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
