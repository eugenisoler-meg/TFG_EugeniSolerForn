import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Sortida } from "@/constants/model";
import { formatDate } from "@/constants/utils";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";

export function SortidaCard({ item, generateText }: { item: Sortida, generateText: (item: Sortida) => Promise<any> }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const handleGenerateText = async (item: Sortida) => {
    try {
      setLoadingId(item.sortida_id);
      await generateText(item);
    } catch (e) { console.error(e); } 
    finally { setLoadingId(null); }
  };
  return (
    <ThemedView style={styles.card}>
      <View style={{ flex: 1 }}>
        <ThemedText type="defaultSemiBold">Sortida a {item.ubicacio}</ThemedText>
        <ThemedText>
          {formatDate(item.data_inici??new Date())} → {formatDate(item.data_fi??new Date())}
        </ThemedText>
        {item.descripcio && (
          <ThemedText style={styles.desc}>{item.descripcio}</ThemedText>
        )}
      </View>

      <View style={{ paddingLeft: 12, width: 80, flexDirection: "column", alignItems: "center" }}>  
        {/* Generate Text */}
        <TouchableOpacity style={styles.iconBtn} onPress={() => handleGenerateText(item)} disabled={loadingId === item.sortida_id}>
        {loadingId === item.sortida_id ? (<ActivityIndicator size={28} />) : (<FontAwesome5 name="copy" size={28} />)}
        </TouchableOpacity>
        {/* Edit */}
        <TouchableOpacity style={styles.iconBtn} onPress={() => generateText(item)}>
          <FontAwesome5 name="pencil-alt" size={24} />
        </TouchableOpacity>
      </View>
    </ThemedView>)
    };


const styles = StyleSheet.create({
    card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },

  iconBtn: {
    padding: 10,
  },

  desc: {
    opacity: 0.6,
    marginTop: 4,
  },
});