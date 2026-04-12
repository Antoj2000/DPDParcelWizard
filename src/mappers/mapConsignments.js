import mapConsignmentToParcel from "./mapConsignment";

export default function mapConsignmentsToParcels(consignments = []) {
  return consignments.map(mapConsignmentToParcel);
}