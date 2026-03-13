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

  function addEmail(newEmail) {
    setAccount((prev) => ({
      ...prev,
      emails: [
        ...prev.emails,
        {
          id: Date.now().toString(),
          value: newEmail.value,
          isPrimary: prev.emails.length === 0,
        },
      ],
    }));
  }

  function updateEmail(updatedEmail) {
    setAccount((prev) => ({
      ...prev,
      emails: prev.emails.map((email) =>
        email.id === updatedEmail.id ? updatedEmail : email,
      ),
    }));
  }

  function deleteEmail(id) {
    setAccount((prev) => ({
      ...prev,
      emails: prev.emails.filter((email) => email.id !== id),
    }));
  }

  return {
    account,
    addPhoneNumber,
    updatePhoneNumber,
    deletePhoneNumber,
    addEmail,
    updateEmail,
    deleteEmail,
  };
}
