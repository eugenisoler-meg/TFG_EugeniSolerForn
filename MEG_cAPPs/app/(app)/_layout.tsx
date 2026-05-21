import { Icon } from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import { Directories, EntityOptions } from "@/components/ui/floating-menus";
import { BACKGROUND, BANNER_HEIGHT, DARK, FOOTER_HEIGHT, GRAY, LIGHT, PADDING } from "@/constants/styles";
import * as Utils from "@/constants/utils";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const [directoriesVisible, setDirectoriesVisible] = useState(false);
  const [entityOptionsVisible, setEntityOptionsVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const showDirectories = () => {
    setDirectoriesVisible((prev) => !prev);
  };
  const closeDirectories = () => {
    setDirectoriesVisible(false);
  };

  const showEntityOptions = () => {
    setEntityOptionsVisible((prev) => !prev);
  };
  const closeEntityOptions = () => {
    setEntityOptionsVisible(false);
  };

  useEffect(() => {
    const loadUserName = async () => {
      const afiliat = await Utils.getAfiliat();
      if (afiliat) {
        setUsername(`${afiliat.nom} ${afiliat.cognoms}`);
      }
    };

    loadUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.banner}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon size={50} />
          <ThemedText type="defaultSemiBold" style={{ color: LIGHT }}>
            MEG cAPP's
          </ThemedText>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          onPress={() => router.push("/profile")}
          activeOpacity={0.75}
        >
          <Ionicons name="person-circle-outline" size={20} color={LIGHT} />
          <ThemedText type="default" style={{ color: LIGHT }}>
            {username ?? "Perfil"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* All pages render here */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Persistent bottom bar */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={showDirectories} style={styles.footerOption}>
          <Entypo name="link" size={35} color={LIGHT} />
          <ThemedText type="defaultSemiBold">Enllaços</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={showEntityOptions}
          style={styles.footerOption}
        >
          <MaterialCommunityIcons name="fleur-de-lis" size={35} color={LIGHT} />
          <ThemedText type="defaultSemiBold">L'entitat</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/dashboard")}
          style={styles.footerOption}
        >
          <Entypo name="home" size={35} color={LIGHT} />
          <ThemedText type="defaultSemiBold">Inici</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={styles.footerOption}
        >
          <Ionicons name="person-circle-outline" size={35} color={LIGHT} />
          <ThemedText type="defaultSemiBold">Perfil</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Utils.confirmLogout}
          style={styles.footerOption}
        >
          <Ionicons name="log-out-outline" size={35} color={LIGHT} />
          <ThemedText type="defaultSemiBold">Surt</ThemedText>
        </TouchableOpacity>
      </View>

      {directoriesVisible && <Directories closeMenu={closeDirectories} />}
      {entityOptionsVisible && <EntityOptions closeMenu={closeEntityOptions} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: PADDING,
  },
  footer: {
    height: FOOTER_HEIGHT,
    backgroundColor: DARK,
    borderTopWidth: 2,
    borderColor: GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  footerOption: {
    flex: 1,
    alignItems: "center",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: BANNER_HEIGHT,
    backgroundColor: DARK,
    borderBottomWidth: 2,
    borderColor: GRAY,
    paddingHorizontal: PADDING,
  },
});
