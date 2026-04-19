import { useAccountContext } from "@/src/context/accountContext";

export default function useAddresses() {
  const {
    addresses,
    loading,
    isSaving,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAccountContext();

  return {
    addresses,
    loading,
    isSaving,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}