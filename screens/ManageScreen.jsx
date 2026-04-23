import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TabInfoBanner from "@/components/deliveries/TabInfoBanner";
import HistoryParcelCard from "@/components/deliveries/cards/HistoryParcelCard";
import IncomingParcelCard from "@/components/deliveries/cards/IncomingParcelCard";
import ManageDeliveryForm from "@/components/manage/ManageDeliveryForm";
import EmptyState from "@/components/ui/EmptyState";
import IncomingHistoryToggle from "@/components/ui/IncomingHistoryToggle";
import useParcels from "@/src/hooks/useParcels";

export default function ManageScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("incoming");
  const [showManageForm, setShowManageForm] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [managedOverrides, setManagedOverrides] = useState({});

  const { inTransit, recentlyDelivered } = useParcels();

  function getParcelKey(parcel) {
    return parcel.id || parcel.trackingNumber;
  }

  function mergeParcelWithOverride(parcel) {
    const override = managedOverrides[getParcelKey(parcel)];
    if (!override) {
      return parcel;
    }

    return {
      ...parcel,
      ...override,
      address: {
        ...parcel.address,
        ...(override.address || {}),
      },
      eta: override.eta || parcel.eta,
    };
  }

  function openManageForm(parcel) {
    setSelectedParcel(parcel);
    setShowManageForm(true);
  }

  function closeManageForm() {
    setShowManageForm(false);
    setSelectedParcel(null);
  }

  function submitManageForm(values) {
    if (!selectedParcel) {
      return;
    }

    const parcelKey = getParcelKey(selectedParcel);
    setManagedOverrides((current) => ({
      ...current,
      [parcelKey]: values,
    }));
    closeManageForm();
  }

  function getDaysUntil(expectedAt) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const expected = new Date(expectedAt);
    const expectedDate = new Date(
      expected.getFullYear(),
      expected.getMonth(),
      expected.getDate(),
    );

    return Math.floor((expectedDate.getTime() - today.getTime()) / 86400000);
  }

  // Show all incoming parcels and sort by soonest delivery date
  const incomingParcels = useMemo(() => {
    return inTransit
      .map((parcel) => mergeParcelWithOverride(parcel))
      .sort((a, b) => new Date(a.expectedAt) - new Date(b.expectedAt));
  }, [inTransit, managedOverrides]);

  // Sort history by most recent delivery date
  const historyParcels = useMemo(() => {
    return recentlyDelivered
      .map((parcel) => mergeParcelWithOverride(parcel))
      .sort((a, b) => new Date(b.expectedAt) - new Date(a.expectedAt));
  }, [recentlyDelivered, managedOverrides]);

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <IncomingHistoryToggle
          value={activeTab}
          onChange={setActiveTab}
          incomingCount={incomingParcels.length}
          historyCount={historyParcels.length}
        />

        {activeTab === "incoming" ? (
          <>
            <TabInfoBanner
              icon="create-outline"
              title="Manage Your Deliveries"
              subtitle="View all incoming parcels and manage those arriving in 2+ days"
              iconColor="#D4002A"
              iconBg="#F6DDE2"
            />

            {incomingParcels.length ? (
              incomingParcels.map((parcel) =>
                (() => {
                  const daysUntil = getDaysUntil(parcel.expectedAt);
                  const canManage = daysUntil >= 2;

                  return (
                    <IncomingParcelCard
                      key={parcel.trackingNumber}
                      parcel={parcel}
                      canManage={canManage}
                      onPress={() => router.push(`/${parcel.trackingNumber}`)}
                      onManagePress={
                        canManage ? () => openManageForm(parcel) : undefined
                      }
                    />
                  );
                })(),
              )
            ) : (
              <EmptyState
                iconName="cube-outline"
                title="No incoming parcels"
                subtitle="Incoming parcels will appear here once they are on the way."
              />
            )}
          </>
        ) : (
          <>
            <TabInfoBanner
              icon="checkmark-circle-outline"
              title="Delivery History"
              subtitle="View all your completed deliveries"
              iconColor="#D4002A"
              iconBg="#F6DDE2"
            />

            {historyParcels.length ? (
              historyParcels.map((parcel) => (
                <HistoryParcelCard
                  key={parcel.trackingNumber}
                  parcel={parcel}
                  onPress={() => router.push(`/${parcel.trackingNumber}`)}
                />
              ))
            ) : (
              <EmptyState
                iconName="time-outline"
                title="No delivery history"
                subtitle="Delivered parcels will appear here once completed."
              />
            )}
          </>
        )}
      </ScrollView>

      {showManageForm && selectedParcel && (
        <ManageDeliveryForm
          parcel={selectedParcel}
          onCancel={closeManageForm}
          onSubmit={submitManageForm}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 14,
    paddingBottom: 26,
  },
});
