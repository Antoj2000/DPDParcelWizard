import { useEffect, useState } from "react";
import { mockAccount } from "@/data/mockAccount";

export default function useAccount() {
  const [account, setAccount] = useState(mockAccount);

  function addPhoneNumber(newNumber) {
    setAccount((prev) => ({
      ...prev,
      mobileNumbers: [
        ...prev.mobileNumbers,
        {
          id: Date.now().toString(),
          value: newNumber.value,
          isPrimary: prev.mobileNumbers.length === 0,
        },
      ],
    }));
  }

  function updatePhoneNumber(updatedNumber) {
    setAccount((prev) => ({
      ...prev,
      mobileNumbers: prev.mobileNumbers.map((num) =>
        num.id === updatedNumber.id ? updatedNumber : num,
      ),
    }));
  }

  function deletePhoneNumber(id) {
    setAccount((prev) => ({
      ...prev,
      mobileNumbers: prev.mobileNumbers.filter((num) => num.id !== id),
    }));
  }

  return {
    account,
    addPhoneNumber,
    updatePhoneNumber,
    deletePhoneNumber,
  };
}
