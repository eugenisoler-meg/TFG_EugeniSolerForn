import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function lightenHexColor(hex: string, amount: number) {
  const normalized = hex.replace("#", "");
  const num = parseInt(normalized, 16);
  const r = Math.min(
    255,
    Math.round(((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * amount),
  );
  const g = Math.min(
    255,
    Math.round(((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * amount),
  );
  const b = Math.min(
    255,
    Math.round((num & 0xff) + (255 - (num & 0xff)) * amount),
  );
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function Collapsible({
  children,
  title,
  headerColor,
}: PropsWithChildren & { title: string; headerColor?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";
  const headingBackground = headerColor
    ? lightenHexColor(headerColor, 0.4)
    : "#eaf4ff";
  const contentBackground = headerColor
    ? lightenHexColor(headerColor, 0.15)
    : "#f7fbff";

  return (
    <ThemedView style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.heading, { backgroundColor: headingBackground }]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText type="defaultSemiBold" style={{ color: "#444" }}>
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && (
        <ThemedView
          style={[styles.content, { backgroundColor: contentBackground }]}
        >
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 10,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  content: {
    marginTop: 8,
    width: "100%",
  },
});
