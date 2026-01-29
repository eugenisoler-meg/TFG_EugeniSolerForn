import { Stack, router } from "expo-router";
import { View, Pressable, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Utils from "@/constants/utils";

export default function AppLayout() {
  return (
    <View style={styles.container}>
      {/* All pages render here */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Persistent bottom bar */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/profile")}>
          <Ionicons name="person-circle-outline" size={35} />
        </Pressable>

        <Pressable onPress={Utils.confirmLogout}>
          <Ionicons name="log-out-outline" size={35} />
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
    height: 50,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
