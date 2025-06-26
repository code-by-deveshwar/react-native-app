import { Slot } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { Stack } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </UserProvider>
  );
}
