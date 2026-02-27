import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // close default index header on the top
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}
