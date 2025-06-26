import {
  View,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  RefreshControl,
  Text
} from "react-native";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import UserCard from "@/components/UserCard";
import SearchBar from "@/components/SearchBar";

export default function AllUsersScreen() {
  const {
    users,
    loadMoreUsers,
    loading,
    refreshing,
    refreshUsers,
  } = useUserContext();

  const [search, setSearch] = useState("");

  // Filter users based on search text
  const filtered = users.filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-1 bg-black/40 px-4 pt-4">
          {/* Search input */}
          <SearchBar value={search} onChange={setSearch} />

          {/* User list with infinite scroll and pull-to-refresh */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UserCard user={item} />}
            onEndReached={loadMoreUsers}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshUsers}
                tintColor="#fff"
              />
            }
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="small" color="#fff" className="my-4" />
              ) : null
            }
            ListEmptyComponent={
              !loading && filtered.length === 0 ? (
                <View className="py-10 items-center">
                  <Text className="text-white text-base">No users found 😕</Text>
                </View>
              ) : null
            }
          />

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
