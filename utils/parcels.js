export function getParcelStatus(expectedAt) {
  if (!expectedAt) {
    return "IN_TRANSIT";
  }

  // Normalize dates to ignore time 
  const today = new Date();
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  // Normalize expectedAt to ignore time
  const expectedDate = new Date(expectedAt);
  const parcelDate = new Date(
    expectedDate.getFullYear(),
    expectedDate.getMonth(),
    expectedDate.getDate(),
  );

  if (parcelDate < currentDate) {
    return "DELIVERED";
  }

  if (parcelDate.getTime() === currentDate.getTime()) {
    return "OUT_FOR_DELIVERY";
  }

  return "IN_TRANSIT";
}


export function getParcelStatusDisplay(status) {
  switch (status) {
    case "DELIVERED":
      return "Delivered";
    case "OUT_FOR_DELIVERY":
      return "Out for Delivery";
    case "IN_TRANSIT":
    default:
      return "In Transit";
  }
}