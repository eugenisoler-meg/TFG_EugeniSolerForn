import { LILA } from "@/constants/styles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, StyleSheet } from "react-native"

export default function AddIcon({ onPress }: { onPress: () => void }) {
    return <TouchableOpacity
            style={styles.fab}
            onPress={onPress}
          >
            <Ionicons style={styles.iconCentered} name="add" size={32} color="white" />
          </TouchableOpacity>
}
export function EditIcon({ onPress }: { onPress: () => void }) {
    return <TouchableOpacity
            style={styles.fab}
            onPress={onPress}
          >
            <Ionicons style={styles.iconCentered} name="save-outline" size={32} color="white" />
          </TouchableOpacity>
}
export function SaveIcon({ onPress, loading }: { onPress: () => void, loading?: boolean }) {
    return <TouchableOpacity
            style={styles.fab}
            onPress={onPress}
          >
            <FontAwesome5 style={styles.iconCentered} name={loading ? "spinner" : "save"} size={28} color="white" />
        </TouchableOpacity>
}
const styles = StyleSheet.create({  
    /* Floating button */
    fab: {
        position: "absolute",
        bottom: 15,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: LILA,
        boxShadow: `2px 2px 2px rgba(0, 0, 0)`,
        elevation: 5,
    },

    iconCentered: { flex: 1, margin: 'auto', verticalAlign: 'middle' },

});