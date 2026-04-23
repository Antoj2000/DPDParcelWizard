import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mockAccount } from "@/data/mockAccount";
import {
  addAddress as addAddressApi,
  addEmailAddress as addEmailAddressApi,
  addPhoneNumber as addPhoneNumberApi,
  deleteAddress as deleteAddressApi,
  deleteEmailAddress as deleteEmailAddressApi,
  deletePhoneNumber as deletePhoneNumberApi,
  getAccountByNumber,
  updateAddress as updateAddressApi,
  updateEmailAddress as updateEmailAddressApi,
  updatePhoneNumber as updatePhoneNumberApi,
} from "@/src/services/accountService";
import { useAuth } from "@/src/context/authContext";

const AccountContext = createContext(null);

function cloneMockAccount() {
  return {
    ...mockAccount,
    emails: [...mockAccount.emails],
    mobileNumbers: [...mockAccount.mobileNumbers],
    addresses: [...mockAccount.addresses],
  };
}

function normalizeAccount(input) {

  const safe = input || {};

  // Map phone_numbers to mobileNumbers and normalize field names
  const mobileNumbers = Array.isArray(safe.phone_numbers)
    ? safe.phone_numbers.map((phone) => ({
        id: String(phone.id),
        value: phone.value,
        isPrimary: phone.is_primary ?? false,
      }))
    : [];

  // Map addresses and normalize field names
  const addresses = Array.isArray(safe.addresses)
    ? safe.addresses.map((addr) => ({
        id: String(addr.id),
        title: addr.title,
        line1: addr.line1,
        line2: addr.line2,
        line3: addr.line3,
        line4: addr.line4,
        eircode: addr.eircode,
        type: addr.type,
        isDefault: addr.is_default ?? false,
      }))
    : [];

  // Map emails and normalize field names
  const emails = Array.isArray(safe.emails)
    ? safe.emails.map((email) => ({
        id: String(email.id),
        value: email.value,
        isPrimary: email.is_primary ?? false,
      }))
    : [];

  // If the account object has a single email field, add it to emails array if not already there
  if (safe.email && emails.length === 0) {
    emails.push({
      id: "email_primary",
      value: safe.email,
      isPrimary: true,
    });
  }

  // Parse name into firstName/lastName or use full name
  const fullName = safe.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    id: safe.account_no || safe.id || "",
    firstName,
    lastName,
    emails,
    mobileNumbers,
    addresses,
  };
}

export function AccountProvider({ children }) {
  const { mode, isHydrating, accountNo } = useAuth();

  const [account, setAccount] = useState(cloneMockAccount());
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const inFlightRefreshRef = useRef(null);

  const clearAccount = useCallback(() => {
    setAccount(cloneMockAccount());
    setError(null);
    setLoading(false);
    setIsSaving(false);
    setLastLoadedAt(null);
  }, []);

  const refreshAccount = useCallback(async () => {
    if (isHydrating) return;

    if (mode === "guest") {
      inFlightRefreshRef.current = null;
      clearAccount();
      return; 
    }

    if (mode === "mock") {
      setLoading(false);
      setError(null);
      setAccount(cloneMockAccount());
      setLastLoadedAt(Date.now());
      return;
    }

    if (!accountNo) {
      setLoading(false);
      setError("Missing account number");
      return;
    }

    if (inFlightRefreshRef.current) {
      return inFlightRefreshRef.current;
    }

    const run = (async () => {
      try {
        setLoading(true);
        setError(null);
        const remoteAccount = await getAccountByNumber(accountNo);
        setAccount(normalizeAccount(remoteAccount));
        setLastLoadedAt(Date.now());
      } catch (err) {
        setError(err?.message || "Failed to load account details");
      } finally {
        setLoading(false);
        inFlightRefreshRef.current = null;
      }
    })();

    inFlightRefreshRef.current = run;
    return run;
  }, [isHydrating, mode, accountNo, clearAccount]);

  useEffect(() => {
    if (isHydrating) return;
    refreshAccount();
  }, [isHydrating, refreshAccount]);

  const runOptimisticMutation = useCallback(
    async (patchFn, apiFn) => {
      const previous = account;

      try {
        setIsSaving(true);
        setError(null);

        setAccount((prev) => patchFn(prev));

        if (mode === "live") {
          if (!accountNo) {
            throw new Error("Missing account number");
          }
          await apiFn();
        }
      } catch (err) {
        setAccount(previous);
        setError(err?.message || "Failed to save account change");
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [account, mode, accountNo],
  );

  const addPhoneNumber = useCallback(
    async (newNumber) => {
      const tempId = "mob_" + Date.now().toString();

      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          mobileNumbers: [
            ...prev.mobileNumbers,
            {
              id: tempId,
              value: newNumber.value,
              isPrimary: prev.mobileNumbers.length === 0,
            },
          ],
        }),
        async () => {
          await addPhoneNumberApi(accountNo, newNumber);
          await refreshAccount();
        },
      );
    },
    [accountNo, refreshAccount, runOptimisticMutation],
  );

  const updatePhoneNumber = useCallback(
    async (updatedNumber) => {
      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          mobileNumbers: prev.mobileNumbers.map((num) =>
            num.id === updatedNumber.id ? { ...num, ...updatedNumber } : num,
          ),
        }),
        async () => {
          await updatePhoneNumberApi(
            accountNo,
            updatedNumber.id,
            updatedNumber,
          );
          await refreshAccount();
        },
      );
    },
    [accountNo, refreshAccount, runOptimisticMutation],
  );

  const deletePhoneNumber = useCallback(
    async (phoneId) => {
      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          mobileNumbers: prev.mobileNumbers.filter((num) => num.id !== phoneId),
        }),
        async () => {
          await deletePhoneNumberApi(accountNo, phoneId);
        },
      );
    },
    [accountNo, runOptimisticMutation],
  );

  const addEmailAddress = useCallback(
    async (newEmail) => {
      const tempId = "email_" + Date.now().toString();

      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          emails: [
            ...prev.emails,
            {
              id: tempId,
              value: newEmail.value,
              isPrimary: prev.emails.length === 0,
            },
          ],
        }),
        async () => {
          await addEmailAddressApi(accountNo, newEmail);
          await refreshAccount();
        },
      );
    },
    [accountNo, refreshAccount, runOptimisticMutation],
  );

  const updateEmailAddress = useCallback(
    async (updatedEmail) => {
      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          emails: prev.emails.map((email) =>
            email.id === updatedEmail.id
              ? { ...email, ...updatedEmail }
              : email,
          ),
        }),
        async () => {
          await updateEmailAddressApi(accountNo, updatedEmail.id, updatedEmail);
          await refreshAccount();
        },
      );
    },
    [accountNo, refreshAccount, runOptimisticMutation],
  );

  const deleteEmailAddress = useCallback(
    async (emailId) => {
      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          emails: prev.emails.filter((email) => email.id !== emailId),
        }),
        async () => {
          await deleteEmailAddressApi(accountNo, emailId);
        },
      );
    },
    [accountNo, runOptimisticMutation],
  );

  const addAddress = useCallback(
    async (newAddress) => {
      const tempId = "addr_" + Date.now().toString();

      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          addresses: [
            ...prev.addresses,
            {
              id: tempId,
              isDefault: false,
              ...newAddress,
            },
          ],
        }),
        async () => {
          await addAddressApi(accountNo, newAddress);
          await refreshAccount();
        },
      );
    },
    [accountNo, refreshAccount, runOptimisticMutation],
  );

  const updateAddress = useCallback(
    async (updatedAddress) => {
      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          addresses: prev.addresses.map((address) =>
            address.id === updatedAddress.id
              ? { ...address, ...updatedAddress }
              : address,
          ),
        }),
        async () => {
          await updateAddressApi(accountNo, updatedAddress.id, updatedAddress);
        },
      );
    },
    [accountNo, runOptimisticMutation],
  );

  const deleteAddress = useCallback(
    async (addressId) => {
      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          addresses: prev.addresses.filter(
            (address) => address.id !== addressId,
          ),
        }),
        async () => {
          await deleteAddressApi(accountNo, addressId);
        },
      );
    },
    [accountNo, runOptimisticMutation],
  );

  const setDefaultAddress = useCallback(
    async (addressId) => {
      const previousDefault = account.addresses.find((addr) => addr.isDefault);

      await runOptimisticMutation(
        (prev) => ({
          ...prev,
          addresses: prev.addresses.map((address) => ({
            ...address,
            isDefault: address.id === addressId,
          })),
        }),
        async () => {
          const selected = account.addresses.find(
            (addr) => addr.id === addressId,
          );
          if (!selected) return;

          await updateAddressApi(accountNo, selected.id, {
            ...selected,
            isDefault: true,
          });

          if (previousDefault && previousDefault.id !== selected.id) {
            await updateAddressApi(accountNo, previousDefault.id, {
              ...previousDefault,
              isDefault: false,
            });
          }
        },
      );
    },
    [account.addresses, accountNo, runOptimisticMutation],
  );

  const value = useMemo(
    () => ({
      account,
      addresses: account.addresses || [],
      loading,
      isSaving,
      error,
      lastLoadedAt,
      refreshAccount,
      clearAccount,
      addPhoneNumber,
      updatePhoneNumber,
      deletePhoneNumber,
      addEmailAddress,
      updateEmailAddress,
      deleteEmailAddress,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      addEmail: addEmailAddress,
      updateEmail: updateEmailAddress,
      deleteEmail: deleteEmailAddress,
    }),
    [
      account,
      loading,
      isSaving,
      error,
      lastLoadedAt,
      refreshAccount,
      clearAccount,
      addPhoneNumber,
      updatePhoneNumber,
      deletePhoneNumber,
      addEmailAddress,
      updateEmailAddress,
      deleteEmailAddress,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
    ],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used inside AccountProvider");
  }
  return context;
}
