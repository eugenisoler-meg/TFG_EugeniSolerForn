import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { formatDate } from "@/constants/utils";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet } from "react-native";

export interface Sortida {
    sortida_id: string;
    unitat_id: string;
    ubicacio: string;
    data_inici: Date;
    data_fi: Date;
    descripcio: string;
}

export function SortidaCard({ item, generateText }: { item: Sortida, generateText: (item: Sortida) => void }) {
  return (
    <ThemedView style={styles.card}>
      <View style={{ flex: 1 }}>
        <ThemedText type="defaultSemiBold">{item.ubicacio}</ThemedText>
        <ThemedText>
          {formatDate(item.data_inici??new Date())} → {formatDate(item.data_fi??new Date())}
        </ThemedText>

        {item.descripcio && (
          <ThemedText style={styles.desc}>{item.descripcio}</ThemedText>
        )}
      </View>

      {/* Icon button */}
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => generateText(item)}
      >
        <Ionicons name="document-text-outline" size={24} />
      </TouchableOpacity>
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