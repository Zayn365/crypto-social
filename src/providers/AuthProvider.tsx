"use client";
import { loginWithWallet, register } from "@/services/auth";
import { getAllPosts } from "@/services/posts";
import { getAllUsers, getUserById } from "@/services/user";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export interface Coin {
  id: string;
  shortname: string;
  name: string;
  native_coin_id: string;
  chain_identifier: number | null;
  image: {
    large?: string;
    small?: string;
    thumb?: string;
  };
  price: number | null;
}

// Create the context with default values
const AuthContext = createContext<any>({
  user: null,
  allUsers: null,
  coins: null,
  allPost: null,
  allUsersAssets: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
  loading: true,
  totalAssetsValues: null,
  setTotalAssetsValues: null,
});

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { disconnect } = useDisconnect();
  const { address } = useAppKitAccount();
  const router = useRouter();

  const [user, setUser] = useState<any | null>(null);
  const [allUsers, setAllUsers] = useState<any | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPost, setAllPost] = useState<any[]>([]);
  const [allUsersAssets, setAllUsersAssets] = useState<any[]>([]);
  const [decodedUserId, setDecodedUserId] = useState<number | null>(null);
  const [totalAssetsValues, setTotalAssetsValues] = useState<number>(0);

  const loginWallet = useMutation({
    mutationFn: loginWithWallet,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      toast.success(`Login successful`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const registerWallet = useMutation({
    mutationFn: register,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      toast.success(`Register successful`);
      router.replace("/settings");
    },
    onError: ({ response }: any) => {
      if (response.data.message === "This user already exits") {
        loginWallet.mutate({
          password: address ?? "",
          walletAddress: address ?? "",
        });
      }
    },
  });

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery<any, Error>({
    queryKey: ["getAllUsers"],
    queryFn: async () => await getAllUsers(),
  });

  const { data: allPostData } = useQuery<any, Error>({
    queryKey: ["getAllPosts"],
    queryFn: async () => await getAllPosts(),
  });

  useEffect(() => {
    if (!allUsers) return;

    const walletAddresses = [
      "0x559432E18b281731c054cD703D4B49872BE4ed53",
      "0xa83114A443dA1CecEFC50368531cACE9F37fCCcb",
      "0xBD4045212C7a51E0F46599F18C02322B1C45f71e",
      "0xE5b1F760BA4334bc311695e125861Eb5870018aD",
      "0x0C488193f50fa771c0AA854aFCFc6D05034d7B3D",
      "0x10cA3e43FFE897a26b6c1b8B9E4a90515EAE62b0",
    ];
    // const walletAddresses = allUsers
    //   .map((user: any) => user?.wallet_address)
    //   .filter(Boolean);

    const fetchCoins = async () => {
      try {
        // Fetch price data
        const priceResponse = await fetch(`/api/getPrice`);
        if (!priceResponse.ok) throw new Error("Failed to fetch price data");
        const priceData = await priceResponse.json();
        const coins = priceData.coins;
        setCoins(coins);

        // Fetch balances and calculate per wallet address
        const walletSummaries = await Promise.all(
          walletAddresses.map(async (address) => {
            const balanceResponse = await fetch(
              `/api/wallet-balances?address=${address}`
            );
            if (!balanceResponse.ok)
              throw new Error(`Failed to fetch balance for ${address}`);
            const balances = await balanceResponse.json(); // assume this returns an array of balances

            let totalTokenValue = 0;
            let totalValueUSD = 0;

            const coinsData = balances
              .map((balanceItem: any) => {
                const matchingCoin = coins.find(
                  (coin: any) => coin.chain_identifier === balanceItem.chainId
                );

                if (!matchingCoin?.price || !balanceItem.balance) return null;

                const tokenAmount = parseFloat(balanceItem.balance);
                const usdValue = tokenAmount * matchingCoin.price;

                totalTokenValue += tokenAmount;
                totalValueUSD += usdValue;

                return {
                  token: matchingCoin.name, // Coin name (e.g., "BTC", "ETH")
                  balance: tokenAmount,
                  valueUSD: usdValue,
                };
              })
              .filter(Boolean); // Remove any nulls from missing coin matches

            return {
              walletAddress: address,
              coins: coinsData, // coins, balances, and values
              totalValues: totalTokenValue, // Total tokens
              totalBalanceUSD: totalValueUSD, // Total value in USD
            };
          })
        );
        setAllUsersAssets(walletSummaries);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [allUsers]);

  useEffect(() => {
    if (allPostData) {
      const sortedPosts = [...allPostData.result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setAllPost(sortedPosts);
    }
  }, [allPostData]);

  useEffect(() => {
    try {
      if (isLoading) {
        setLoading(true);
        return;
      }

      if (error || !usersData) {
        router.replace("/");
        setUser(null);
        setLoading(false);
        disconnect();
        return;
      }

      setLoading(false);
      setAllUsers(usersData?.users?.rows);
    } catch (error) {
      console.log(error);
    }
  }, [usersData, isLoading, error]);

  useEffect(() => {
    try {
      registerWallet.mutate({
        password: address ?? "",
        roleId: 2,
        walletAddress: address ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const parsedToken = typeof token === "string" ? JSON.parse(token) : token;
      const accessToken = parsedToken?.accessToken?.token;

      if (!accessToken) {
        setLoading(false);
        return;
      }

      const decoded: any = jwtDecode(accessToken);
      if (decoded?.userId) {
        setDecodedUserId(Number(decoded.userId));
      } else {
        deleteCookie("token");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to decode token", error);
      deleteCookie("token");
      setLoading(false);
    }
  }, []);

  const {
    data: userDataById,
    isSuccess: userSuccess,
    isError: userError,
  } = useQuery({
    queryKey: ["getUserById", decodedUserId],
    queryFn: () => getUserById({ userId: decodedUserId! }),
    enabled: !!decodedUserId,
  });

  useEffect(() => {
    if (userSuccess && userDataById) {
      setUser(userDataById?.user);
      setLoading(false);
    } else if (userError) {
      deleteCookie("token");
      setUser(null);
      setLoading(false);
    }
  }, [userSuccess, userDataById, userError]);

  const logout = async () => {
    try {
      deleteCookie("token");
      setUser(null);
      disconnect();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    allUsers,
    setUser,
    coins,
    allPost,
    allUsersAssets,
    isAuthenticated: !!user,
    logout,
    loading,
    totalAssetsValues,
    setTotalAssetsValues,
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
