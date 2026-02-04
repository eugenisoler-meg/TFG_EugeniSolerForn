import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";

import * as SecureStore from "expo-secure-store";
import ErrorScreen from "../error";
import* as Database from "@/constants/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Permissions = {
  AEiG: boolean;
  DEM: boolean;
  MEG: boolean;
};

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [permisos, setPermisos] = useState<Permissions | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      setError(null);
      setPermisos(null);

      const USER = await Utils.getUser();  
      console.log('USER : ',USER);   
      if (!USER) {
        setLoading(false);
        return ErrorScreen("No hi ha cap usuari amb sessió iniciada vàlida.");
      }
  
      try {
        const permisos = parseInt(await Database.getPermisosNivell(USER.afiliat_id));
        console.warn(permisos);
        setPermisos({
          AEiG: (permisos & 1) > 0,
          DEM:  (permisos & 2) > 0 , // TODO : Properament
          MEG:  (permisos & 4) > 0 , // TODO : Properament
        });
      } catch (e) {
        console.log(e);
        if (e instanceof Error)
          setError(e.message);
        else setError("S'ha produït un error desconegut.");
  
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
  }, []);


  const Button = ({
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
      style={[styles.button, !enabled && styles.disabled]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )

  // 🔵 Loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // 🔴 Error screen
  if (error) return ErrorScreen(error);
  if (!permisos) {
    return ErrorScreen("No tens permisos per a fer servir l'aplicació.");
    
  }

  return (
    <View style={styles.container}>
      {/* MAIN BUTTON AREA */}
      <View style={styles.content}>
        <Button title="Agrupament" enabled={permisos.AEiG} route="./(aeig)/index" />
        <Button title="Demarcació" enabled={permisos.DEM} route="/todo" />
        <Button title="MEG" enabled={permisos.MEG} route="/todo" />
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
    justifyContent: "space-evenly",
    padding: 15,
  },

  button: {
    height: 120,
    borderRadius: 14,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
  },

  disabled: {
    opacity: 0.35,
    backgroundColor: "#999",
    borderColor: "#666",
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  footer: {
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});