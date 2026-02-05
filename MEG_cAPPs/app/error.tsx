import { StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ErrorScreen(message: string) {

    return (
    <ThemedView style={styles.container}>
        <ThemedView style={styles.row}>
          <Ionicons name="alert-circle-outline" size={32} color="red"/>
          <ThemedText type='title' >ERROR</ThemedText>
        </ThemedView>
        <ThemedText type='subtitle'>{typeof message === 'string' ? message : JSON.stringify(message)}</ThemedText>
        <ThemedText type='link' onPress={() => router.replace('/login')}>Torna a iniciar sessio</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  
});