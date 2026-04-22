import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FormFooter from "@/components/addresses/FormFooter";
import FormHeader from "@/components/addresses/FormHeader";
import IssueCategoryDropdown from "@/components/support/CategoryDropDown";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/colors";
import useAccount from "@/src/hooks/useAccount";

const CATEGORY_OPTIONS = [
  "Delivery Issue",
  "Damaged Parcel",
  "Missing Item",
  "Incorrect Address",
  "Other",
];

export default function ParcelSupportForm({
  trackingNumber,
  onCancel,
  onSubmit,
}) {
  const { account } = useAccount();

  const fullNameDefault = useMemo(() => {
    const first = account?.firstName?.trim() || "";
    const last = account?.lastName?.trim() || "";
    return (first + " " + last).trim();
  }, [account?.firstName, account?.lastName]);

  const emailDefault = useMemo(() => {
    if (!Array.isArray(account?.emails)) return "";
    const primary = account.emails.find((e) => e?.isPrimary);
    return (primary?.value || account.emails[0]?.value || "").trim();
  }, [account?.emails]);

  const [form, setForm] = useState({
    trackingNumber: String(trackingNumber || ""),
    fullName: fullNameDefault,
    email: emailDefault,
    category: "",
    subject: "",
    message: "",
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Keep prefilled values in sync when account/tracking changes.
    setForm((prev) => ({
      ...prev,
      trackingNumber: String(trackingNumber || ""),
      fullName: prev.fullName || fullNameDefault,
      email: prev.email || emailDefault,
    }));
  }, [trackingNumber, fullNameDefault, emailDefault]);

  function focusSubjectInput() {
    setTimeout(() => {
      subjectRef.current?.focus();
    }, 120);
  }

  function handleMessageFocus() {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 120);
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSelectCategory(option) {
    setForm((prev) => ({ ...prev, category: option }));
    setIsCategoryOpen(false);
  }

  function validate() {
    const email = form.email.trim().toLowerCase();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!form.trackingNumber.trim()) {
      Alert.alert("Missing Tracking Number", "Tracking number is required.");
      return false;
    }

    if (!form.fullName.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return false;
    }

    if (!emailIsValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }

    if (!form.category) {
      Alert.alert("Missing Category", "Please select an issue category.");
      return false;
    }

    if (!form.subject.trim()) {
      Alert.alert("Missing Subject", "Please enter a subject.");
      return false;
    }

    if (!form.message.trim()) {
      Alert.alert("Missing Message", "Please enter your message.");
      return false;
    }

    return true;
  }

  function submitHandler() {
    if (!validate()) return;

    const payload = {
      trackingNumber: form.trackingNumber.trim(),
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      category: form.category,
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (onSubmit) {
      onSubmit(payload);
      return;
    }

    Alert.alert("Query Submitted", "Your support query has been submitted.");
    onCancel?.();
  }

  return (
    <Modal animationType="slide" transparent onShow={focusSubjectInput}>
      <KeyboardAvoidingView style={styles.overlay} behavior="padding">
        <View style={styles.sheet}>
          <FormHeader
            icon="chatbubble-ellipses-outline"
            title="Contact Support"
            subtitle="We're here to help"
            onClose={onCancel}
          />

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.parcelCard}>
              <Text style={styles.parcelLabel}>Query about parcel:</Text>
              <View style={styles.parcelChip}>
                <Text style={styles.parcelChipText}>{form.trackingNumber}</Text>
              </View>
            </View>

            <Input
              label="Full Name *"
              placeholder="Your full name"
              textInputConfig={{
                value: form.fullName,
                onChangeText: (v) => updateField("fullName", v),
                returnKeyType: "next",
                blurOnSubmit: false,
              }}
            />

            <Input
              label="Email Address *"
              placeholder="you@example.com"
              textInputConfig={{
                value: form.email,
                onChangeText: (v) => updateField("email", v),
                keyboardType: "email-address",
                autoComplete: "email",
                textContentType: "emailAddress",
                autoCapitalize: "none",
                autoCorrect: false,
                returnKeyType: "next",
                blurOnSubmit: false,
              }}
            />

            <IssueCategoryDropdown
              value={form.category}
              options={CATEGORY_OPTIONS}
              isOpen={isCategoryOpen}
              onToggle={() => setIsCategoryOpen((prev) => !prev)}
              onSelect={handleSelectCategory}
            />

            <Input
              ref={subjectRef}
              label="Subject *"
              placeholder="Brief description of the issue"
              textInputConfig={{
                value: form.subject,
                onChangeText: (v) => updateField("subject", v),
                returnKeyType: "next",
                blurOnSubmit: false,
                onSubmitEditing: () => messageRef.current?.focus(),
              }}
            />

            <Input
              ref={messageRef}
              label="Message *"
              placeholder="Please provide details about your query..."
              style={styles.messageInput}
              textInputConfig={{
                value: form.message,
                onChangeText: (v) => updateField("message", v),
                onFocus: handleMessageFocus,
                multiline: true,
                numberOfLines: 5,
                textAlignVertical: "top",
                returnKeyType: "default",
                onSubmitEditing: submitHandler,
              }}
            />
          </ScrollView>

          <FormFooter onCancel={onCancel} onSubmit={submitHandler} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 2,
    borderColor: "#EFEFF3",
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },

  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  parcelCard: {
    borderWidth: 1,
    borderColor: "#F3C7D1",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#FFF8FA",
  },

  parcelLabel: {
    color: Colors.greyText,
    fontSize: 14,
    marginBottom: 8,
  },

  parcelChip: {
    alignSelf: "flex-start",
    backgroundColor: Colors.dpdRed,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  parcelChipText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  messageInput: {
    minHeight: 120,
  },
});
