import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
import UserCard from "../../components/UserCard";
import { useUserContext } from "@/context/UserContext";

export default function FavoritesScreen() {
  const { favorites } = useUserContext();

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
          {favorites.length === 0 ? (
            <Text className="text-center text-white text-base mt-20">
              No favorites yet ⭐
            </Text>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <UserCard user={item} />}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
