import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import { useRef } from "react";
import { useUserContext, User } from "@/context/UserContext";
import FavoriteButton from "./FavoriteButton";

/**
 * UserCard with Glassmorphism + press animation
 */
export default function UserCard({ user }: { user: User }) {
  const { favorites, toggleFavorite } = useUserContext();
  const isFavorite = favorites.some((u) => u.id === user.id);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        className="flex-row items-center p-4 rounded-2xl mb-3 bg-white/10 border border-white/20 backdrop-blur-md"
        style={styles.cardShadow}
      >
        <Image
          source={{ uri: user.avatar }}
          className="w-14 h-14 rounded-full"
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-white">
            {user.first_name} {user.last_name}
          </Text>
          <Text className="text-sm text-white/70">{user.email}</Text>
        </View>

        <FavoriteButton isActive={isFavorite} onPress={() => toggleFavorite(user)} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6, 
  },
});
