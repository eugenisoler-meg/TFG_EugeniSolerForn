import { StyleSheet, View } from "react-native";

export default function DataGrid({ children }: { children: React.ReactNode }) {
  return <View style={styles.grid}>{children}</View>;
}

const styles = StyleSheet.create({
  grid: {
    gap: 10,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
});