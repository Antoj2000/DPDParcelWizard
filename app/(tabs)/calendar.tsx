import { StyleSheet } from "react-native";
import { Header } from "@react-navigation/elements";
import DpdHeader from "@/components/header/DpdHeader";

export default function Calendar() {
  return (
    <>
      <Header title="Calendar" />
      <DpdHeader />
    </>
  );
}

const styles = StyleSheet.create({});
