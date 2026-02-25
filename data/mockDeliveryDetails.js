export const mockDeliveryDetails = [
  {
    id: "901190123",
    trackingNumber: "901190123",

    status: "OUT_FOR_DELIVERY",
    statusDisplay: "Out for Delivery",

    eta: {
      label: "Today, 2:00 PM – 4:00 PM",
    },

    fromName: "Amazon Ireland",
    toName: "Anthony Johnson",

    address: {
      line1: "50 Valleycourt",
      line2: "Bunnavalley",
      line3: "Athlone",
      line4: "Westmeath",
      eircode: "N37 P1H2",
    },

    shippedAt: "2026-02-23",
    expectedAt: "2026-02-25",
  },

  {
    id: "901190124",
    trackingNumber: "901190124",

    status: "OUT_FOR_DELIVERY",
    statusDisplay: "Out for Delivery",

    eta: {
      label: "Today at 4:00 PM",
    },

    fromName: "Amazon Ireland",
    toName: "Conor Johnson",

    address: {
      line1: "ATU Galway",
      line2: "Dublin Road",
      line3: "Galway",
      line4: "Galway",
      eircode: "H91 AB12",
    },

    shippedAt: "2026-02-24",
    expectedAt: "2026-02-25",
  },

  {
    id: "901190125",
    trackingNumber: "901190125",

    status: "DELIVERED",
    statusDisplay: "Delivered",

    eta: {
      label: "Delivered today at 11:42 AM",
    },

    fromName: "Amazon Ireland",
    toName: "Anthony Johnson",

    address: {
      line1: "50 Valleycourt",
      line2: "Bunnavalley",
      line3: "Athlone",
      line4: "Westmeath",
      eircode: "N37 XY45",
    },

    shippedAt: "2026-02-21",
    expectedAt: "2026-02-24",
  },

  {
    id: "901190126",
    trackingNumber: "901190126",

    status: "DELIVERED",
    statusDisplay: "Delivered",

    eta: {
      label: "Delivered yesterday at 6:08 PM",
    },

    fromName: "Amazon Ireland",
    toName: "Anthony Johnson",

    address: {
      line1: "50 Valleycourt",
      line2: "Bunnavalley",
      line3: "Athlone",
      line4: "Westmeath",
      eircode: "N37 P1H2",
    },

    shippedAt: "2026-02-20",
    expectedAt: "2026-02-23",
  },
];
