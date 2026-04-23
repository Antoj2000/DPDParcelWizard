import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TabInfoBanner from "@/components/deliveries/TabInfoBanner";
import HistoryParcelCard from "@/components/deliveries/cards/HistoryParcelCard";
import IncomingParcelCard from "@/components/deliveries/cards/IncomingParcelCard";
import EmptyState from "@/components/ui/EmptyState";
import IncomingHistoryToggle from "@/components/ui/IncomingHistoryToggle";
import useParcels from "@/src/hooks/useParcels";

export default function ManageScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("incoming");

  const { inTransit, recentlyDelivered } = useParcels();

  // Filter incoming parcels to those arriving in 2+ days and sort by soonest delivery date
  const incomingParcels = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return inTransit
      .filter((parcel) => {
        const expected = new Date(parcel.expectedAt);
        const expectedDate = new Date(
          expected.getFullYear(),
          expected.getMonth(),
          expected.getDate(),
        );
        const diffMs = expectedDate.getTime() - today.getTime();
        const diffDays = Math.floor(diffMs / 86400000);
        return diffDays >= 2;
      })
      .sort((a, b) => new Date(a.expectedAt) - new Date(b.expectedAt));
  }, [inTransit]);

  // Sort history by most recent delivery date
  const historyParcels = useMemo(() => {
    return [...recentlyDelivered].sort(
      (a, b) => new Date(b.expectedAt) - new Date(a.expectedAt),
    );
  }, [recentlyDelivered]);

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
              subtitle="Change delivery dates or addresses for parcels arriving in 2+ days"
              iconColor="#D4002A"
              iconBg="#F6DDE2"
            />

            {incomingParcels.length ? (
              incomingParcels.map((parcel) => (
                <IncomingParcelCard
                  key={parcel.trackingNumber}
                  parcel={parcel}
                  onPress={() => router.push(`/${parcel.trackingNumber}`)}
                  onManagePress={() => {}}
                />
              ))
            ) : (
              <EmptyState
                iconName="cube-outline"
                title="No incoming parcels"
                subtitle="Parcels that are at least 2 days out will appear here."
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
