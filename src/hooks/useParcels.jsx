import { useEffect, useMemo, useState } from "react";
import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";
import { getAccountNo } from "@/src/storage/authStorage";
import { getParcelStatus, getParcelStatusDisplay } from "@/utils/parcels";

import { getParcelsForAccount } from "@/src/services/parcelService";
import mapConsignmentsToParcels from "@/src/mappers/mapConsignments";

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

        const accountNo = await getAccountNo();
        if (accountNo) {
          const consignments = await getParcelsForAccount(accountNo);
          const mappedParcels = mapConsignmentsToParcels(consignments);
          setParcels(mappedParcels);
        } else {
          setParcels(mockDeliveryDetails); // Fallback to mock data if no account number is found
        }
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
