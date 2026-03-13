import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@/constants/colors'

export default function LoginInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  rightIcon,
  onRightPress,
  autoCompleteType,
  
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType={autoCompleteType}
        />
        {rightIcon ? (
          <Pressable onPress={onRightPress} style={styles.iconButton}>
            <Ionicons name={rightIcon} size={22} color="#7d7a86" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 18,
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: "#66627a",
    marginBottom: 10,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd8df",
    borderRadius: 18,
    backgroundColor: "#fbfbfc",
    minHeight: 48,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkText,
  },
  iconButton: {
    padding: 6,
    marginLeft: 8,
  },
});
