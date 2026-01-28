import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import ErrorScreen from "../error";
import* as Database from "@/constants/database";

type Permissions = {
  AEiG: boolean;
  DEM: boolean;
  MEG: boolean;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [permisos, setPermisos] = useState<Permissions | null>(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    let USER = await SecureStore.getItemAsync('USER');
    
    if (!USER) {
      setLoading(false);
      return ErrorScreen("No hi ha cap usuari amb sessió iniciada vàlida.");
    }
    const __USER = JSON.parse(USER);

    try {
      const res = await Database.getPermisosNivell(__USER.afiliat_id);
      const json = await res.json();
      if (json.error) throw new Error(json.error || 'An error occurred while fetching permissions');
      
      setPermisos({
        AEiG: (parseInt(json.success) | 1) > 0,
        DEM: false, // (parseInt(json.success) | 2) > 0 , // TODO : Properament
        MEG: false, // (parseInt(json.success) | 4) > 0 , // TODO : Properament
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const NavButton = ({
    title,
    enabled,
    route,
  }: {
    title: string;
    enabled: boolean;
    route: any;
  }) => (
    <Pressable
      disabled={!enabled}
      onPress={() => router.push(route)}
      style={[
        styles.button,
        !enabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );

  // 🔵 Loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permisos) return ErrorScreen("No tens permisos per a fer servir l'aplicació.");

  // 🔵 Main UI
  return (
    <View style={styles.grid}>
      <NavButton title="Agrupament" enabled={permisos.AEiG} route="/(app)/(aeig)" />
      <NavButton title="Demarcació (properament)" enabled={permisos.DEM} route="/(app)/(demarcacio)" />
      <NavButton title="MEG (properament)" enabled={permisos.MEG} route="/(app)/(meg)" />
      <NavButton title="El meu perfil" enabled={true} route="/(app)/perfil" />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f46e5",
  },
  disabled: {
    backgroundColor: "#999",
    opacity: 0.4, // grayscale look
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
