"use client";
import { getAllUsers } from "@/services/user";
import { useDisconnect } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Create the context with default values
const AuthContext = createContext<any>({
  user: null,
  allUsers: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
  loading: true,
});

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { disconnect } = useDisconnect();
  const [user, setUser] = useState<any | null>(null);
  const [allUsers, setAllUsers] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<Response, Error>({
    queryKey: ["getAllUsers"],
    queryFn: async () => await getAllUsers(),
  });

  useEffect(() => {
    try {
      if (isLoading) {
        setLoading(true);
        return;
      }

      if (error || !userData) {
        router.replace("/");
        setUser(null);
        setLoading(false);
        disconnect();
        return;
      }

      setLoading(false);
      setAllUsers(userData);
    } catch (error) {
      console.log(error);
    }
  }, [userData, isLoading, error]);

  const logout = async () => {
    try {
      deleteCookie("token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    allUsers,
    setUser,
    isAuthenticated: !!user,
    logout,
    loading,
  };

  if (isLoading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        Loading ...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
