import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import { BACKGROUND, DARK, GRAY, LIGHT, LIGHT_GRAY } from "@/constants/styles";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function ToDoScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Logo size={100} />
        <ThemedText type="subtitle" style={styles.title}>
          Apartat en desenvolupament
        </ThemedText>
        <ThemedText type="body" style={styles.description}>
          Aquesta funcionalitat està temporalment desactivada.
        </ThemedText>
        <ThemedText></ThemedText>
        <ThemedText type="body" style={styles.description}>
          Tornarem aviat per a oferir una experiència estable, fiable i útil per
          al voluntariat de l'entitat.
        </ThemedText>
        <Pressable onPress={() => router.back()} style={styles.link}>
          <ThemedText type="link">Tornar enrere</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: BACKGROUND,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    padding: 24,
    borderRadius: 22,
    backgroundColor: DARK,
    borderWidth: 1,
    borderColor: GRAY,
    shadowColor: LIGHT_GRAY,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 18,
    color: LIGHT,
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    color: LIGHT_GRAY,
  },
  link: {
    marginTop: 25,
    paddingVertical: 15,
  },
});
