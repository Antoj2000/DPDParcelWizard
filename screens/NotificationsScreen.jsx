import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import NotificationActionBar from "@/components/notifications/NotificationActionBar";
import NotificationCard from "@/components/notifications/NotificationCard";
import EmptyState from "@/components/ui/EmptyState";
import IncomingHistoryToggle from "@/components/ui/IncomingHistoryToggle";
import { Colors } from "@/constants/colors";
import { mockNotifications } from "@/data/mockNotifications";

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const allCount = notifications.length;

  const visibleNotifications = useMemo(() => {
    if (activeTab === "unread") {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [notifications, activeTab]);

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  function handleClearAll() {
    setNotifications([]);
  }

  function handleDelete(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function handlePress(notification) {
    if (notification.parcelTracking) {
      router.push(`/${notification.parcelTracking}`);
    }
  }

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Header banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconCircle}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={Colors.dpdRed}
            />
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Notifications</Text>
            <Text style={styles.bannerSubtitle}>
              Stay updated with your deliveries
            </Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>{unreadCount} new</Text>
            </View>
          )}
        </View>

        <IncomingHistoryToggle
          value={activeTab}
          onChange={setActiveTab}
          incomingCount={allCount}
          historyCount={unreadCount}
          incomingLabel="All"
          historyLabel="Unread"
        />

        <NotificationActionBar
          onMarkAllRead={handleMarkAllRead}
          onClearAll={handleClearAll}
        />

        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={() => handlePress(notification)}
              onDelete={() => handleDelete(notification.id)}
            />
          ))
        ) : (
          <EmptyState
            iconName="notifications-off-outline"
            title={
              activeTab === "unread"
                ? "No unread notifications"
                : "No notifications"
            }
            subtitle={
              activeTab === "unread"
                ? "You're all caught up."
                : "Delivery updates will appear here."
            }
          />
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
  },
  content: {
    padding: 14,
    paddingBottom: 26,
  },
  banner: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F3B6C1",
    backgroundColor: "#FDEFF2",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  bannerIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F6DDE2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.dpdRed,
    marginBottom: 3,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: Colors.mutedText,
    lineHeight: 20,
  },
  newBadge: {
    borderRadius: 999,
    backgroundColor: Colors.dpdRed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
