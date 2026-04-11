import { useEffect, useMemo, useState } from "react";
import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";
import { getParcelStatus, getParcelStatusDisplay } from "@/utils/parcels";

export default function useParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate loading parcels from an API
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

  // Compute parcel statuses and categorize them
  const parcelsWithStatus = useMemo(() => {
    return parcels.map((parcel) => {
      const status = getParcelStatus(parcel.expectedAt);

      return {
        ...parcel,
        status,
        statusDisplay: getParcelStatusDisplay(status),
      };
    });
  }, [parcels]);

  const arrivingToday = useMemo(() => {
    return parcelsWithStatus.filter(
      (parcel) => parcel.status === "OUT_FOR_DELIVERY",
    );
  }, [parcelsWithStatus]);

  const recentlyDelivered = useMemo(() => {
    return parcelsWithStatus.filter((parcel) => parcel.status === "DELIVERED");
  }, [parcelsWithStatus]);

  return {
    parcels: parcelsWithStatus,
    arrivingToday,
    recentlyDelivered,
    loading,
    error,
  };
}
