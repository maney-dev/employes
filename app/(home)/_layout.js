import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="employes" />
      <Stack.Screen name="adddetails" />
      <Stack.Screen name="listepresence" />
      <Stack.Screen name="[user]" />
      <Stack.Screen name="sommaire" />
    </Stack>
  );
}
