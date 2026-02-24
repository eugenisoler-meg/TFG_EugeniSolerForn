import { Stack, router, usePathname  } from "expo-router";
import { View, Pressable, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/themed-text";
import * as Utils from "@/constants/utils";
import {BANNER_HEIGHT, FOOTER_HEIGHT, PADDING, MARGIN_TOP} from '@/constants/styles';
import { Icon } from "@/components/logo";
import { useState } from "react";
import Directories from "@/components/ui/directories";

export default function AppLayout() {
  const [menuVisible, setMenuVisible] = useState(true);
  const showDirectories = () => {setMenuVisible(prev => !prev);};
  const closeMenu = () => {console.log("menu closed");setMenuVisible(false);};

  const pathname = usePathname();
  const onProfile = pathname === "/profile";

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
          <Pressable onPress={() => showDirectories() } style={styles.footerOption}>
            <Entypo name="link" size={35} />
            <ThemedText type="defaultSemiBold">Directoris</ThemedText>
          </Pressable>

          <Pressable onPress={() => router.push("/profile") } style={styles.footerOption}>
            <Ionicons name="person-circle-outline" size={35} />
            <ThemedText type="defaultSemiBold">Perfil</ThemedText>
          </Pressable>

          <Pressable onPress={Utils.confirmLogout} style={styles.footerOption}>
            <Ionicons name="log-out-outline" size={35} />
            <ThemedText type="defaultSemiBold">Tanca sessió</ThemedText>
          </Pressable>
        </View>

        {menuVisible && <Directories closeMenu={closeMenu}/>}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerOption:{
    flex:1,
    alignItems: "center"     
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
