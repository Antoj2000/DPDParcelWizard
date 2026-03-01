import { StyleSheet, View, Image } from "react-native";
import SectionCard from "./SectionCard";
export default function PodImage() {
  const imageUrl = require("@/assets/images/pexels-tima-miroshnichenko-6170463.jpg");

  return (
    <SectionCard title="Proof of Delivery">
      <View style={styles.imageWrapper}>
        <Image source={imageUrl} style={styles.image} />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
