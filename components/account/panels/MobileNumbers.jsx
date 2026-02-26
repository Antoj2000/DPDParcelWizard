import { StyleSheet,View } from "react-native";
import ContactCard from "../ContactCard";
export default function MobileNumbers() {
  return (
    <View>
      <ContactCard
        value="+353 87 7766 382"
        isPrimary={true}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </View>
  );
}
const styles = StyleSheet.create({});
