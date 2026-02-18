import { TipusLlistaType } from "@/constants/model";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  value: TipusLlistaType | null;
  onChange: (value: TipusLlistaType) => void;
}

export const TripleSelector: React.FC<Props> = ({
  value,
  onChange,
}) => {
  const options: TipusLlistaType[] = ["cau", "sortida", "campament"];

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const selected = value === option;

        return (
          <TouchableOpacity
            key={option}
            style={[styles.option, selected && styles.selected]}
            onPress={() => onChange(option)}
          >
            <Text style={[styles.text, selected && styles.selectedText]}>
              {option.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  selected: {
    backgroundColor: "#007bff",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "700",
  },
});
