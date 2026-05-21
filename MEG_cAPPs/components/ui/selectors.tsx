import { TipusLlista, TipusLlistaKeys } from "@/constants/model";
import { LIGHT } from "@/constants/styles";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  value: TipusLlistaKeys | null;
  onChange: (value: TipusLlistaKeys) => void;
}

export const TripleSelector: React.FC<Props> = ({
  value,
  onChange,
}) => {
  const options: TipusLlistaKeys[] = Object.keys(TipusLlista) as TipusLlistaKeys[];

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
    color: LIGHT,
    fontWeight: "700",
  },
});
