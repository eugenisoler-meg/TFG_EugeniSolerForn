import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Linking, Pressable, StyleSheet, View } from "react-native";

export default function ErrorScreen({ message }: { message: string }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Logo size={84} color="#d1d5db" style={styles.logo} />
        <View style={styles.row}>
          <Ionicons name="alert-circle-outline" size={32} color="#ff4d4f" />
          <ThemedText type="title" style={styles.title}>
            ERROR
          </ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.message}>
          {typeof message === "string" ? message : JSON.stringify(message)}
        </ThemedText>

        <ThemedText
          type="link"
          onPress={() => router.replace("/login")}
          style={styles.link}
        >
          Torna a iniciar sessio
        </ThemedText>

        <Pressable
          onPress={() =>
            Linking.openURL(
              "https://escoltesiguies.sinergiacrm.org/index.php?entryPoint=stic_AWF_renderForm&id=00000f97-dc5f-8d9f-ea9c-69fc4ff8f538",
            )
          }
          style={styles.report}
        >
          <ThemedText type="link">
            Notificar incidència de l'aplicació
          </ThemedText>
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
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 0,
    color: "#fff",
    marginLeft: 8,
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
    color: "#d1d5db",
    marginBottom: 12,
  },
  link: {
    marginTop: 6,
  },
  logo: {
    marginBottom: 8,
    opacity: 0.85,
  },
  report: {
    marginTop: 12,
    paddingVertical: 6,
  },
});
