import { Stack, router, usePathname  } from "expo-router";
import { View, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/themed-text";
import * as Utils from "@/constants/utils";
import { Icon } from "@/components/logo";

export const BANNER_HEIGHT = 70 as const;
export const FOOTER_HEIGHT = 70 as const;
export const PADDING = 12 as const;
export const MARGIN_TOP = 25 as const;

export default function AppLayout() {
  const onProfile = (usePathname() === "/profile");
  return (
      <View style={styles.container}>
        <View style={styles.banner}>
          {Icon(60)}
          <ThemedText type="subtitle">MEG cAPP's</ThemedText>
        </View>

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
    padding: PADDING,
  },

  footer: {
    height: FOOTER_HEIGHT,
    borderTopWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  banner:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: BANNER_HEIGHT,
    backgroundColor: "#eee",
    borderBottomWidth: 2,
    borderColor: "#ddd",
    marginTop: MARGIN_TOP,
    paddingHorizontal: PADDING,
   },
});
