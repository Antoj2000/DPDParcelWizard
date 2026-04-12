function formatDateLabel(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function mapConsignmentToParcel(consignment) {
  return {
    id: String(consignment.consignment_number),
    trackingNumber: String(consignment.consignment_number),

    toName: consignment.name,

    address: {
      line1: consignment.addressline1,
      line2: consignment.addressline2 || "",
      line3: consignment.addressline3,
      line4: consignment.addressline4,
      eircode: consignment.eircode,
    },

    eta: {
      label: formatDateLabel(consignment.expected_delivery_date),
    },

    expectedAt: consignment.expected_delivery_date,
    status: consignment.status,
    statusDisplay: consignment.statusDisplay,

    fromName: "Unknown Sender",
    shippedAt: null,
    deliveryDepot: consignment.delivery_depot,
    weight: consignment.weight,
    accountNo: consignment.account_no,
  };
}