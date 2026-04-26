export const FAQ_SECTIONS = [
  { id: "delivery", label: "Delivery" },
  { id: "account", label: "Account" },
  { id: "scheduling", label: "Scheduling" },
];

export const FAQ_ITEMS = [
  {
    id: "delivery-track",
    section: "delivery",
    question: "How do I track my parcel?",
    answer:
      "Open Deliveries and select your parcel to view the latest updates, ETA, and tracking history.",
  },
  {
    id: "delivery-missed",
    section: "delivery",
    question: "What if I miss my delivery?",
    answer:
      "You can reschedule, choose a safe place, or redirect to a pickup location from the Manage tab.",
  },
  {
    id: "delivery-address",
    section: "delivery",
    question: "Can I change my delivery address?",
    answer:
      "Yes. For eligible parcels, open Manage and submit an address change before the parcel goes out for final delivery.",
  },
  {
    id: "delivery-hours",
    section: "delivery",
    question: "What are DPD's delivery hours?",
    answer:
      "Standard delivery windows are typically during daytime business hours. Exact timing depends on route and location.",
  },
  {
    id: "account-reset-password",
    section: "account",
    question: "How do I reset my password?",
    answer:
      "Use the Forgot Password option on the login screen and follow the reset link sent to your email.",
  },
  {
    id: "account-addresses",
    section: "account",
    question: "How do I manage my saved addresses?",
    answer:
      "Go to the Address Book from the side menu to add, edit, or delete your saved delivery addresses.",
  },
  {
    id: "account-email",
    section: "account",
    question: "How do I change my email address?",
    answer:
      "You can update your email address in the Account settings. Make sure to verify the new email to continue receiving notifications.",
  },
  {
    id: "scheduling-how",
    section: "scheduling",
    question: "How do delivery schedules work?",
    answer:
      "Delivery schedules let you set preferences for specific dates. You can hold deliveries, redirect to an alternate address, or arrange collection from a DPD location. Schedules can be set for a single day or a date range.",
  },
  {
    id: "scheduling-change",
    section: "scheduling",
    question: "Can I change my delivery date?",
    answer:
      "Yes, if your parcel is eligible. Open Manage, select your parcel, then choose a new date from the available options.",
  },
];

export function getFaqItemsBySection(sectionId) {
  return FAQ_ITEMS.filter((item) => item.section === sectionId);
}
