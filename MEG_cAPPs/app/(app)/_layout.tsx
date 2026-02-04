import { Stack, router, usePathname  } from "expo-router";
import { View, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/themed-text";
import * as Utils from "@/constants/utils";

export default function AppLayout() {
  const onProfile = (usePathname() === "/profile");
  return (
      <View style={styles.container}>
        {/* All pages render here */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        {/* Persistent bottom bar */}
        <View style={styles.footer}>
          <Pressable onPress={() => router.push("/profile") } style={{ alignItems: "center" }}>
            <Ionicons name="person-circle-outline" size={35} />
            <ThemedText>Perfil</ThemedText>
          </Pressable>

          <Pressable onPress={Utils.confirmLogout} style={{ alignItems: "center" }}>
            <Ionicons name="log-out-outline" size={35} />
            <ThemedText>Tanca sessió</ThemedText>
          </Pressable>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  footer: {
    height: 70,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
