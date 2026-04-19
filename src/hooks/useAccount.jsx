import { useAccountContext } from "@/src/context/accountContext";

export default function useAccount() {
  const {
    account,
    loading,
    isSaving,
    error,
    refreshAccount,
    addPhoneNumber,
    updatePhoneNumber,
    deletePhoneNumber,
    addEmailAddress,
    updateEmailAddress,
    deleteEmailAddress,
    // Backward-compat aliases from context:
    addEmail,
    updateEmail,
    deleteEmail,
  } = useAccountContext();

  return {
    account,
    loading,
    isSaving,
    error,
    refreshAccount,
    addPhoneNumber,
    updatePhoneNumber,
    deletePhoneNumber,
    addEmailAddress,
    updateEmailAddress,
    deleteEmailAddress,
    // Keep old names so nothing breaks
    addEmail,
    updateEmail,
    deleteEmail,
  };
}