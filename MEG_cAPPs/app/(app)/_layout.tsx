import { Icon } from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import { Directories, EntityOptions } from "@/components/ui/floating-menus";
import { BANNER_HEIGHT, FOOTER_HEIGHT, PADDING } from '@/constants/styles';
import * as Utils from "@/constants/utils";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, router, usePathname } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
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
            <Entypo name="link" size={35} color="#fff" />
            <ThemedText type="defaultSemiBold">Enllaços</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={showEntityOptions} style={styles.footerOption}>
            <MaterialCommunityIcons name="fleur-de-lis" size={35} color="#fff" />
            <ThemedText type="defaultSemiBold">L'entitat</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/dashboard")} style={styles.footerOption}>
            <Entypo name="home" size={35} color="#fff" />
            <ThemedText type="defaultSemiBold">Inici</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile") } style={styles.footerOption}>
            <Ionicons name="person-circle-outline" size={35} color="#fff" />
            <ThemedText type="defaultSemiBold">Perfil</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={Utils.confirmLogout} style={styles.footerOption}>
            <Ionicons name="log-out-outline" size={35} color="#fff" />
            <ThemedText type="defaultSemiBold">Surt</ThemedText>
          </TouchableOpacity>
        </View>

        {directoriesVisible && <Directories closeMenu={closeDirectories}/>}
        {entityOptionsVisible && <EntityOptions closeMenu={closeEntityOptions}/>}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: PADDING,
  },
  footer: {
    height: FOOTER_HEIGHT,
    backgroundColor: "#111",
    borderTopWidth: 2,
    borderColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
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
    backgroundColor: "#000",
    borderBottomWidth: 2,
    borderColor: "#333",
    paddingHorizontal: PADDING,
   },
});
