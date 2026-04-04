import { useCallback, useState } from "react";
import * as Location from "expo-location";
import { router } from "expo-router";

export default function useLocateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locateUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission was denied.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      router.push({
        pathname: "/map",
        params: {
          latitude: String(location.coords.latitude),
          longitude: String(location.coords.longitude),
        },
      });
    } catch (err) {
      setError("Failed to get current location.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    locateUser,
    loading,
    error,
  };
}