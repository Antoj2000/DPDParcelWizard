import { useEffect, useState } from "react";
import { MOCK_ADDRESSES } from "@/data/mockAddresses";

export default function useAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAddresses() {
      try {
        setLoading(true);
        setError(null);

        // later replace with API call
        setAddresses(MOCK_ADDRESSES);
      } catch (err) {
        setError("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    }

    loadAddresses();
  }, []);

  function addAddress(newAddress) {
    setAddresses((prev) => [...prev, newAddress]);
  }

  function updateAddress(updatedAddress) {
    setAddresses((prev) =>
      prev.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address,
      ),
    );
  }

  function deleteAddress(addressId) {
    setAddresses((prev) => prev.filter((address) => address.id !== addressId));
  }

  function setDefaultAddress(addressId) {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    );
  }

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}
