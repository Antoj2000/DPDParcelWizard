// later align to real API schema



export interface Delivery {
  consignmentNumber: string;
  status: "OutForDelivery" | "InTransit" | "Delivered" | "Delayed";
  recipient: string;
  sender: string;
  address: string;
  eta?: string;               // "2025-01-28 14:00" etc
  lastScan?: string;          // "Arrived at Dublin Hub"
  reference?: string;
}
