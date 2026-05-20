import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  content: React.ReactNode;
};

export default function DataCard({ title, icon, content }: Props) {
  const [open, setOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;

    Animated.timing(fadeAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  return (
    <View style={{ width: "100%" }}>
      <Pressable onPress={toggle} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons name={icon} size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.chevronBox}>
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={18}
              color="#fff"
              style={{ marginLeft: "auto" }}
            />
          </View>
        </View>

        {/* Animated Content */}
        <Animated.View
          style={[
            styles.content,
            {
              height: open ? "100%" : 30,
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-5, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {content}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  header: { flex: 1, flexDirection: "row", alignItems: "center", gap: 4 },
  title: { fontSize: 15, fontWeight: "600", color: "#fff" },
  content: {
    color: "white",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "column",
    gap: 10,
  },
  value: { color: "white", fontSize: 28, fontWeight: "bold" },
  chevronBox: { width: 20, alignItems: "center" },
  iconBox: { width: 25, alignItems: "center" },
});
