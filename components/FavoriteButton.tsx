import { Pressable, Animated } from "react-native";
import { useRef } from "react";
import { Entypo } from "@expo/vector-icons";

/**
 * FavoriteButton
 * Star icon with scale animation
 */
export default function FavoriteButton({
  isActive,
  onPress,
}: {
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animate the button scale when pressed
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.3, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Entypo name="star" size={24} color={isActive ? "gold" : "gray"} />
      </Animated.View>
    </Pressable>
  );
}
