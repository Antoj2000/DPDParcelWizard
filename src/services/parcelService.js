import {
  getConsignmentsForAccount,
  getConsignmentByNumber,
} from "@/src/services/consignmentService";

export async function getParcelsForAccount(accountNo) {
  const consignmentNumbers = await getConsignmentsForAccount(accountNo);

  const consignments = await Promise.all(
    consignmentNumbers.map((num) => getConsignmentByNumber(num))
  );

  return consignments;
}