import { useEffect, useState } from "react";
import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";

export default function useParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadParcels() {
      try {
        setLoading(true);
        setError(null);

        // later replace this with API call
        setParcels(mockDeliveryDetails);
      } catch (err) {
        setError("Failed to load parcels");
      } finally {
        setLoading(false); 
      } 
    }

    loadParcels();
  }, []); 

  const arrivingToday = parcels.filter(
    (parcel) => parcel.status === "OUT_FOR_DELIVERY",
  );

  const recentlyDelivered = parcels.filter(
    (parcel) => parcel.status === "DELIVERED",
  );

  return {
    parcels,
    arrivingToday,
    recentlyDelivered,
    loading,
    error,
  };
}