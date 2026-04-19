import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginToAccount } from "@/src/services/authService";
import { clearAuth, getAccountNo, getToken } from "@/src/storage/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isHydrating, setIsHydrating] = useState(true);
  const [mode, setMode] = useState("guest");
  const [token, setToken] = useState(null);
  const [accountNo, setAccountNo] = useState(null);

  const isAuthenticated = mode === "live" && !!token && !!accountNo;
  const isMockMode = mode === "mock";

  // Hydrate auth state from storage on mount
  const hydrate = useCallback(async () => {
    setIsHydrating(true);
    try {
      const [storedToken, storedAccountNo] = await Promise.all([
        getToken(),
        getAccountNo(),
      ]);

      if (storedToken && storedAccountNo) {
        setToken(storedToken);
        setAccountNo(storedAccountNo);
        setMode("live");
      } else {
        setToken(null);
        setAccountNo(null);
        setMode("guest");
      }
    } finally {
      setIsHydrating(false);
    }
  }, []);

  // Automatically hydrate on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Login function that updates state and storage
  const login = useCallback(async (accountNoInput, password) => {
    const result = await loginToAccount(accountNoInput, password);

    setToken(result.token);
    setAccountNo(result.account?.account_no || accountNoInput);
    setMode("live");

    return result;
  }, []);

  // Skip login for mock mode
  const skipLogin = useCallback(async () => {
    await clearAuth();
    setToken(null);
    setAccountNo(null);
    setMode("mock");
  }, []);

  // Logout function that clears auth state and storage
  const logout = useCallback(async () => {
    await clearAuth();
    setToken(null);
    setAccountNo(null);
    setMode("guest");
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isHydrating,
      mode,
      token,
      accountNo,
      isAuthenticated,
      isMockMode,
      hydrate,
      login,
      skipLogin,
      logout,
    }),
    [
      isHydrating,
      mode,
      token,
      accountNo,
      isAuthenticated,
      isMockMode,
      hydrate,
      login,
      skipLogin,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
