import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";

// Enable layout animations on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Type definition for user
export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type UserContextType = {
  users: User[];
  favorites: User[];
  loading: boolean;
  refreshing: boolean;
  loadMoreUsers: () => void;
  refreshUsers: () => void;
  toggleFavorite: (user: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const API_KEY = "reqres-free-v1";

  // Fetch and append next page of users, avoiding duplicates
  const fetchUsers = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://reqres.in/api/users?page=${pageNum}`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setHasMore(false);
        return;
      }

      // Deduplicate by user.id
      setUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u.id));
        const uniqueNew = data.data.filter((u: User) => !existingIds.has(u.id));
        return [...prev, ...uniqueNew];
      });

      setPage((prev) => prev + 1);
      if (pageNum >= data.total_pages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh: replace with page 1, reset pagination
  const refreshUsers = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`https://reqres.in/api/users?page=1`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await res.json();
      setUsers(data.data); // replace instead of append
      setPage(2); // start next load at page 2
      setHasMore(true);
    } catch (err) {
      console.error("❌ Error refreshing users:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Load next page if available
  const loadMoreUsers = () => {
    if (!loading && hasMore) {
      fetchUsers(page);
    }
  };

  // Toggle user in/out of favorites
  const toggleFavorite = (user: User) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const exists = favorites.find((u) => u.id === user.id);
    if (exists) {
      setFavorites((prev) => prev.filter((u) => u.id !== user.id));
    } else {
      setFavorites((prev) => [...prev, user]);
    }
  };

  // Load page 1 on app start
  useEffect(() => {
    fetchUsers(1);
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        favorites,
        toggleFavorite,
        loadMoreUsers,
        refreshUsers,
        loading,
        refreshing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
