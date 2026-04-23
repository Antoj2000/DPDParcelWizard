import { mockDeliveryDetails } from "@/data/mockDeliveryDetails";
import { useAuth } from "@/src/context/authContext";
import mapConsignmentsToParcels from "@/src/mappers/mapConsignments";
import { getParcelsForAccount } from "@/src/services/parcelService";
import { getParcelStatus, getParcelStatusDisplay } from "@/utils/parcels";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ParcelContext = createContext(null);

function formatEtaLabel(expectedAt) {
  const parsed = new Date(expectedAt);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = parsed.toLocaleString("en-IE", { month: "short" });
  const year = parsed.getFullYear();
  return `${day} ${month} ${year}`;
}

export function ParcelProvider({ children }) {
  const { isHydrating, mode, isMockMode, accountNo } = useAuth();

  const [rawParcels, setRawParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Track when parcels were last loaded to help with caching
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const inFlightRef = useRef(null);

  const clearParcels = useCallback(() => {
    setRawParcels([]);
    setError(null);
    setLoading(false);
    setLastLoadedAt(null);
  }, []);

  const updateParcel = useCallback((parcelIdOrTracking, updates) => {
    if (!parcelIdOrTracking || !updates) {
      return;
    }

    setRawParcels((current) =>
      current.map((parcel) => {
        const parcelKey = parcel.id || parcel.trackingNumber;
        if (parcelKey !== parcelIdOrTracking) {
          return parcel;
        }

        return {
          ...parcel,
          ...updates,
          address: {
            ...parcel.address,
            ...(updates.address || {}),
          },
        };
      }),
    );
  }, []);

  const refreshParcels = useCallback(async () => {
    if (isHydrating) return;

    if (mode === "guest") {
      inFlightRef.current = null;
      clearParcels();
      return;
    }

    if (inFlightRef.current) {
      return inFlightRef.current;
    }

    const run = (async () => {
      try {
        setLoading(true);
        setError(null);

        if (isMockMode || !accountNo) {
          setRawParcels(mockDeliveryDetails);
          setLastLoadedAt(Date.now());
          return;
        }

        const consignments = await getParcelsForAccount(accountNo);
        const mappedParcels = mapConsignmentsToParcels(consignments);
        setRawParcels(mappedParcels);
        setLastLoadedAt(Date.now());
      } catch (_err) {
        setError("Failed to load parcels");
      } finally {
        setLoading(false);
        inFlightRef.current = null;
      }
    })();

    inFlightRef.current = run;
    return run;
  }, [isHydrating, mode, isMockMode, accountNo, clearParcels]);

  // Automatically load parcels when the provider mounts (but not during hydration)
  useEffect(() => {
    if (isHydrating) return;
    refreshParcels();
  }, [isHydrating, refreshParcels]);

  useEffect(() => {
    if (mode === "guest") {
      clearParcels();
    }
  }, [mode, clearParcels]);

  const parcels = useMemo(() => {
    return rawParcels.map((parcel) => {
      const status = getParcelStatus(parcel.expectedAt);
      const etaLabel = formatEtaLabel(parcel.expectedAt) || parcel.eta?.label;

      return {
        ...parcel,
        eta: {
          ...(parcel.eta || {}),
          label: etaLabel,
        },
        status,
        statusDisplay: getParcelStatusDisplay(status),
      };
    });
  }, [rawParcels]);

  const arrivingToday = useMemo(() => {
    return parcels.filter((parcel) => parcel.status === "OUT_FOR_DELIVERY");
  }, [parcels]);

  const recentlyDelivered = useMemo(() => {
    return parcels.filter((parcel) => parcel.status === "DELIVERED");
  }, [parcels]);

  const inTransit = useMemo(() => {
    return parcels.filter((parcel) => parcel.status === "IN_TRANSIT");
  }, [parcels]);

  const value = useMemo(
    () => ({
      parcels,
      arrivingToday,
      recentlyDelivered,
      inTransit,
      loading,
      error,
      lastLoadedAt,
      refreshParcels,
      clearParcels,
      updateParcel,
    }),
    [
      parcels,
      arrivingToday,
      recentlyDelivered,
      inTransit,
      loading,
      error,
      lastLoadedAt,
      refreshParcels,
      clearParcels,
      updateParcel,
    ],
  );

  return (
    <ParcelContext.Provider value={value}>{children}</ParcelContext.Provider>
  );
}

export function useParcelContext() {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error("useParcelContext must be used inside ParcelProvider");
  }
  return context;
}
