import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PADDING } from "@/constants/styles";
import * as Utils from "@/constants/utils";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function ModalScreen() {
  useEffect(() => {
    const preLoad = async () => {
      const user = await Utils.getUser();
      if (!user) return;
      if (user.ultim_login < new Date().getTime() - Utils.DAY_MILLIS)
        await Utils.logout();
    };
    preLoad();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Logo />
      <ThemedText type="title">MEG cAPPs</ThemedText>
      <Link href="./login" dismissTo style={styles.link}>
        <ThemedText type="link">Inicia sessió</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: PADDING,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
