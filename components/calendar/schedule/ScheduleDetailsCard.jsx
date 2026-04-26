import AddressBookDropdown from "@/components/addresses/AddressBookDropdown";
import NewAddressForm from "@/components/addresses/NewAddressForm";
import { Colors } from "@/constants/colors";
import useAddresses from "@/src/hooks/useAddresses";
import { formatDateKey } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import TextButton from "../../ui/TextButton";

export default function ScheduleDetailsCard({
  selectedDates = [],
  scheduleMode = "single",
  onModeChange,
  onSave,
  onCancel,
}) {
  const { addresses } = useAddresses();

  const [name, setName] = useState("");
  const [action, setAction] = useState("H");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [customAddress, setCustomAddress] = useState(null);
  const [showCustomAddressForm, setShowCustomAddressForm] = useState(false);

  const selectedSavedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) || null,
    [addresses, selectedAddressId],
  );

  const redirectAddress = selectedSavedAddress || customAddress;

  // Sort selected dates and determine start/end for display and validation
  const orderedDates = useMemo(() => {
    return [...selectedDates].sort((a, b) => a - b);
  }, [selectedDates]);

  const isRangeMode = scheduleMode === "range";
  const requiredSelectionCount = isRangeMode ? 2 : 1;
  const startDate = orderedDates[0] ?? null;
  const endDate = isRangeMode
    ? (orderedDates[1] ?? null)
    : (orderedDates[0] ?? null);

  function formatDate(date) {
    if (!date) {
      return "";
    }

    return formatDateKey(date);
  }

  // Validation and pass to parent
  function handleSave() {
    if (
      !startDate ||
      !endDate ||
      orderedDates.length !== requiredSelectionCount
    ) {
      return;
    }

    if (action === "A") {
      const line1 = redirectAddress?.line1?.trim() || "";
      const line4 = redirectAddress?.line4?.trim() || "";
      const eircode = redirectAddress?.eircode?.trim() || "";

      if (!line1 || !line4 || !eircode) {
        return;
      }
    }

    const dateStrings = isRangeMode
      ? [formatDate(startDate), formatDate(endDate)]
      : [formatDate(startDate)];

    const payload = {
      name: name || `Schedule ${formatDate(startDate)}`,
      dates: dateStrings,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      mode: scheduleMode,
      action,
    };

    if (action === "A") {
      payload.redirectAddress = {
        line1: redirectAddress.line1.trim(),
        line2: redirectAddress.line2?.trim() || "",
        line3: redirectAddress.line3?.trim() || "",
        line4: redirectAddress.line4.trim(),
        eircode: redirectAddress.eircode.trim().toUpperCase(),
      };
    }

    onSave(payload);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Schedule Details</Text>
          <Text style={styles.subtitle}>
            {startDate && endDate && startDate.getTime() !== endDate.getTime()
              ? `${startDate.toDateString()} - ${endDate.toDateString()}`
              : startDate
                ? startDate.toDateString()
                : ""}
          </Text>
        </View>

        <Pressable style={styles.closeBtn} onPress={onCancel}>
          <Ionicons name="close" size={18} color="#6B7280" />
        </Pressable>
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter schedule name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Range:</Text>
        <Switch
          value={isRangeMode}
          onValueChange={(enabled) => {
            if (onModeChange) {
              onModeChange(enabled ? "range" : "single");
            }
          }}
          trackColor={{ false: "#d1d5db", true: Colors.dpdRed }}
          thumbColor={isRangeMode ? Colors.dpdRed : "#f4f3f4"}
        />
      </View>

      <Text style={styles.modeHint}>
        {isRangeMode
          ? "Range mode requires 2 future dates (start and end)."
          : "Single-day mode requires exactly 1 future date."}
      </Text>

      {orderedDates.length !== requiredSelectionCount ? (
        <Text style={styles.validationHint}>
          {isRangeMode
            ? `Selected ${orderedDates.length}/2 dates. Pick a start and end date.`
            : `Selected ${orderedDates.length}/1 date. Pick a date to proceed.`}
        </Text>
      ) : null}

      <View style={styles.formRow}>
        <Text style={styles.label}>Action:</Text>

        <View style={styles.actionRow}>
          {[
            { code: "H", label: "Hold" },
            { code: "A", label: "Redirect" },
            { code: "C", label: "Collect" },
          ].map(({ code, label }) => (
            <Pressable
              key={code}
              onPress={() => setAction(code)}
              style={[
                styles.actionButton,
                action === code && styles.actionButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  action === code && styles.actionButtonTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {action === "A" ? (
        <View style={styles.redirectWrap}>
          <AddressBookDropdown
            label="Redirect Address"
            hint="Choose from your saved addresses or enter a one-time address"
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            customAddress={customAddress}
            onSelectSavedAddress={(address) => {
              setSelectedAddressId(address.id);
            }}
            onSelectOther={() => {
              setSelectedAddressId(null);
              setShowCustomAddressForm(true);
            }}
          />

          {!redirectAddress ? (
            <Text style={styles.validationHint}>
              Select a redirect destination to save this schedule.
            </Text>
          ) : null}
        </View>
      ) : null}

      <TextButton
        label="Save Schedule"
        onPress={handleSave}
        style={styles.saveButton}
        textStyle={styles.saveButtonText}
      />

      {showCustomAddressForm && (
        <NewAddressForm
          onCancel={() => setShowCustomAddressForm(false)}
          onSubmit={(values) => {
            setCustomAddress(values);
            setSelectedAddressId(null);
            setShowCustomAddressForm(false);
          }}
          initialValues={customAddress}
          requireTitle={false}
          title="Custom Redirect Address"
          subtitle="Enter a one-time redirect destination"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EFEFF3",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  title: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkText,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
  },
  modeHint: {
    marginTop: -2,
    marginBottom: 12,
    fontSize: 13,
    color: "#4B5563",
  },
  validationHint: {
    marginTop: -4,
    marginBottom: 12,
    fontSize: 13,
    color: Colors.dpdRed,
    fontWeight: "600",
  },
  closeBtn: {
    padding: 4,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: Colors.darkText,
    flex: 1,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    color: Colors.darkText,
    backgroundColor: "#F3F4F6",
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    flex: 2,
    justifyContent: "flex-end",
  },
  actionButton: {
    borderWidth: 1,
    borderColor: Colors.dpdRed,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
  },
  actionButtonSelected: {
    backgroundColor: Colors.dpdRed,
  },
  actionButtonText: {
    fontSize: 14,
    color: Colors.dpdRed,
    fontWeight: "600",
  },
  actionButtonTextSelected: {
    color: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: Colors.dpdRed,
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  redirectWrap: {
    marginTop: 2,
    marginBottom: 12,
  },
});
