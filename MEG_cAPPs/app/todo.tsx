import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
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
    backgroundColor: "#050505",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    padding: 24,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 18,
    color: "#fff",
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    color: "#d1d5db",
  },
  link: {
    marginTop: 25,
    paddingVertical: 15,
  },
});
