import { LILA } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, StyleSheet } from "react-native"

export default function AddIcon({ onPress }: { onPress: () => void }) {
    return <TouchableOpacity
            style={styles.fab}
            onPress={onPress}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
}

const styles = StyleSheet.create({  
    /* Floating button */
    fab: {
        position: "absolute",
        bottom: 25,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: LILA,
        elevation: 5,
    },
});