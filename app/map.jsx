import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const { latitude, longitude } = useLocalSearchParams();

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

  // DPD head office coordinates
  const dpdLatitude = 53.40803;
  const dpdLongitude = -7.89955;

  const hasValidCoords =
    !Number.isNaN(parsedLatitude) && !Number.isNaN(parsedLongitude);

  const region = useMemo(() => {
    if (!hasValidCoords) {
      return null;
    }

    return {
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [parsedLatitude, parsedLongitude, hasValidCoords]);

  if (!hasValidCoords || !region) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Location data is unavailable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        <Marker
          coordinate={{
            latitude: parsedLatitude,
            longitude: parsedLongitude,
          }}
          title="Your location"
        />
        <Marker
          coordinate={{
            latitude: dpdLatitude,
            longitude: dpdLongitude,
          }}
          title="DPD Head Office"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
