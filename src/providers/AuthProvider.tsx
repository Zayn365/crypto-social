"use client";
import { getAllPosts } from "@/services/posts";
import { getAllUsers, getUserById } from "@/services/user";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import MainLoader from "@/components/common/MainLoader";

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

interface CoinData {
  token: string;
  balance: number;
  valueUSD: number;
}

interface WalletSummary {
  walletAddress: string;
  coins: CoinData[];
  totalValues: number;
  totalBalanceUSD: number;
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
    if (!allUsers || allUsers.length === 0) {
      setLoading(false);
      return;
    }

    // Extract wallet addresses, filtering out falsy values
    const walletAddresses = allUsers
      .map((user: any) => user?.wallet_address)
      .filter((address: any): address is string => !!address);

    if (walletAddresses.length === 0) {
      setLoading(false);
      return;
    }

    const fetchCoins = async () => {
      try {
        setLoading(true);

        // Fetch price data
        const priceResponse = await fetch(`/api/getPrice`);
        if (!priceResponse.ok) throw new Error("Failed to fetch price data");
        const priceData = await priceResponse.json();
        const fetchedCoins = priceData?.coins as Coin[];
        setCoins(fetchedCoins);

        // Fetch balances and calculate per wallet address, handling individual errors
        const walletSummaries = await Promise.all(
          walletAddresses.map(async (address: any) => {
            try {
              const balanceResponse = await fetch(
                `/api/wallet-balances?address=${address}`
              );
              if (!balanceResponse.ok) {
                console.error(`Failed to fetch balance for ${address}`);
              }
              const balances = (await balanceResponse.json()) as any[];

              let totalTokenValue = 0;
              let totalValueUSD = 0;

              const coinsData = balances
                .map((balanceItem) => {
                  const matchingCoin = fetchedCoins?.find(
                    (coin) => coin?.chain_identifier === balanceItem?.chainId
                  );

                  if (!matchingCoin?.price || !balanceItem?.balance)
                    return null;

                  const tokenAmount = parseFloat(balanceItem?.balance);
                  const usdValue = tokenAmount * matchingCoin?.price;

                  totalTokenValue += tokenAmount;
                  totalValueUSD += usdValue;

                  return {
                    token: matchingCoin?.name,
                    balance: tokenAmount,
                    valueUSD: usdValue,
                    price: matchingCoin?.price,
                    symbol: matchingCoin?.shortname,
                    logo: matchingCoin?.image?.large,
                  };
                })
                .filter((item): item is any => !!item);

              return {
                walletAddress: address,
                coins: coinsData,
                totalValues: totalTokenValue,
                totalBalanceUSD: totalValueUSD,
              };
            } catch (err) {
              console.error(`Error fetching balance for ${address}:`, err);
              return null; // Return null for failed addresses
            }
          })
        );

        // Filter out null results (failed fetches)
        const validSummaries = walletSummaries.filter(
          (summary): summary is WalletSummary => !!summary
        );

        // Update allUsers with assets for successful fetches
        setAllUsers((prevUsers: any) =>
          prevUsers.map((user: any) => ({
            ...user,
            assets: validSummaries?.find(
              (summary) =>
                summary.walletAddress?.toLowerCase() ===
                user?.wallet_address?.toLowerCase()
            ),
          }))
        );

        setAllPost((prevData: any) =>
          prevData.map((post: any) => {
            const updatedUserInfo = {
              ...post?.userInfo,
              assets: validSummaries?.find(
                (summary) =>
                  summary?.walletAddress?.toLowerCase() ===
                  post?.userInfo?.wallet_address?.toLowerCase()
              ),
            };

            const updatedPostInfo = Array.isArray(post?.postInfo)
              ? post.postInfo.map((info: any) => {
                  const userWallet = info?.userInfo?.wallet_address;
                  const matchingSummary = validSummaries?.find(
                    (summary) =>
                      summary?.walletAddress?.toLowerCase() ===
                      userWallet?.toLowerCase()
                  );

                  return {
                    ...info,
                    userInfo: info?.userInfo
                      ? {
                          ...info?.userInfo,
                          assets: matchingSummary,
                        }
                      : null,
                  };
                })
              : [];

            return {
              ...post,
              userInfo: updatedUserInfo,
              postInfo: updatedPostInfo,
            };
          })
        );

        // Update allUsersAssets with successful summaries
        setAllUsersAssets(validSummaries);
      } catch (err) {
        console.error("Error fetching price data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [allUsers, allPost]);

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
      setLoading(false);
      console.log(error);
    }
  }, [usersData, isLoading, error]);

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
        <MainLoader />
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
