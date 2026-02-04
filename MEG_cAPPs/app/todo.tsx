import { ThemedText } from "@/components/themed-text";
import { router} from "expo-router";
import { Pressable } from "react-native";
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from "react-native";

export default function ToDoScreen() {
    return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <ThemedText type="title" >Aquest apartat està en desenvolupament</ThemedText>
        <Pressable onPress={ ()=> router.back()} style={styles.link}>
            <ThemedText type="link">Torna enrere</ThemedText>
        </Pressable>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});