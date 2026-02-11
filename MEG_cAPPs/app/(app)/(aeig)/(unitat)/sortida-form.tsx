import { useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, Alert, } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SortidaForm() {
  const [ubicacio, setUbicacio] = useState("");
  const [desc, setDesc] = useState("");

  const save = () => {
    if (!ubicacio) return Alert.alert("Falta ubicació");

    // TODO: call API
    Alert.alert("Guardat");

    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Nova Sortida</ThemedText>

      <TextInput
        placeholder="Ubicació"
        style={styles.input}
        value={ubicacio}
        onChangeText={setUbicacio}
      />

      <TextInput
        placeholder="Descripció"
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />

      <TouchableOpacity style={styles.btn} onPress={save}>
        <ThemedText style={{ color: "white" }}>Guardar</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },

  btn: {
    marginTop: 30,
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});
