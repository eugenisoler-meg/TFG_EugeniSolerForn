import { createLlista } from "@/constants/database";
import { useLocalSearchParams, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity } from "react-native";
import * as MODEL from "@/constants/model";
import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import { ThemedText } from "@/components/themed-text";
import { cleanResponse, formatDate, properDissabte } from "@/constants/utils";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TripleSelector } from "@/components/ui/selectors";

export default function LlistaFormScreen()  {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const { unitat_id } = useLocalSearchParams<{unitat_id?:string}>();
    const [data_llista, setDataLlista] = useState<Date|null>(null);
    const [tipus, setTipus] = useState<MODEL.TipusLlistaType|null>('cau');
    const [showPicker, setShowPicker] = useState(false);

    const save = async () => {
        if (!data_llista || !tipus) return Alert.alert("Omple tots els camps");
        if (!unitat_id) return Alert.alert("Error", "Unitat no trobada");
        setError(null);
        try {
            setLoading(true);
            const response = await createLlista({ unitat_id, data_llista, tipus });
            //router.replace({ pathname:"/(app)/(aeig)/(unitat)/llistes", params: {unitat_id}});
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al guardar la llista");
        } finally {
            setLoading(false);
        }
      };
    
    const handleDataLlistaChange = (event: any, selectedDate?: Date) => {
        if (!selectedDate) return;
        setDataLlista(selectedDate);
        setShowPicker(false);
    };

    if(error) return ErrorScreen(error);
    if(loading) return LoadingScreen();
    return <>
    <ThemedText style={styles.label}>Data:</ThemedText>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
        <ThemedText style={{fontSize: 14, fontWeight: "400"}}>
          {data_llista && `${formatDate(new Date(data_llista))} `
          || "Selecciona una data"}
          </ThemedText>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
            value={data_llista ?? properDissabte()}
            mode="date"
            display="default"
            onChange={handleDataLlistaChange}
          />
      )}
        <ThemedText style={styles.label}>Tipus d'activitat:</ThemedText>
        <TripleSelector
            value={tipus}
            onChange={setTipus}
        />

        <TouchableOpacity style={styles.btn} onPress={save}>
            <ThemedText style={{color: "white", fontWeight: "700"}}>Guardar</ThemedText>
        </TouchableOpacity>
    </>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "800",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    minHeight: 50,
  },

  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    height: 50,
    justifyContent: "center",
  },

  btn: {
    marginTop: 30,
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});