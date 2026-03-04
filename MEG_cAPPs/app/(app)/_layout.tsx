import { Stack, router, usePathname  } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ThemedText } from "@/components/themed-text";
import * as Utils from "@/constants/utils";
import {BANNER_HEIGHT, FOOTER_HEIGHT, PADDING, MARGIN_TOP} from '@/constants/styles';
import { Icon } from "@/components/logo";
import { useState } from "react";
import {Directories, EntityOptions } from "@/components/ui/floating-menus";

export default function AppLayout() {
  const [directoriesVisible, setDirectoriesVisible] = useState(false);
  const [entityOptionsVisible, setEntityOptionsVisible] = useState(false);
  const showDirectories = () => {setDirectoriesVisible(prev => !prev);};
  const closeDirectories = () => {setDirectoriesVisible(false);};

  const showEntityOptions = () => {setEntityOptionsVisible(prev => !prev);};
  const closeEntityOptions = () => {setEntityOptionsVisible(false);};

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
          <TouchableOpacity onPress={showDirectories} style={styles.footerOption}>
            <Entypo name="link" size={35} />
            <ThemedText type="defaultSemiBold">Enllaços</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={showEntityOptions} style={styles.footerOption}>
            <MaterialCommunityIcons name="fleur-de-lis" size={35} />
            <ThemedText type="defaultSemiBold">L'entitat</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/dashboard")} style={styles.footerOption}>
            <Entypo name="home" size={35} />
            <ThemedText type="defaultSemiBold">Inici</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile") } style={styles.footerOption}>
            <Ionicons name="person-circle-outline" size={35} />
            <ThemedText type="defaultSemiBold">Perfil</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={Utils.confirmLogout} style={styles.footerOption}>
            <Ionicons name="log-out-outline" size={35} />
            <ThemedText type="defaultSemiBold">Surt</ThemedText>
          </TouchableOpacity>
        </View>

        {directoriesVisible && <Directories closeMenu={closeDirectories}/>}
        {entityOptionsVisible && <EntityOptions closeMenu={closeEntityOptions}/>}
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
