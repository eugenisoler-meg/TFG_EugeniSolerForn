import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import { ThemedText } from "@/components/themed-text";
import { SaveIcon } from "@/components/ui/add-icon";
import { saveSortida } from "@/constants/database";
import * as MODEL from "@/constants/model";
import { LIGHT, LIGHT_GRAY, LINK } from "@/constants/styles";
import { formatDate } from "@/constants/utils";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export default function SortidaForm() {
  const [title, settitle] = useState("Nova sortida");
  const [ubicacio, setUbicacio] = useState("");
  const [descripcio, setDesc] = useState("");
  const [data_inici, setInici] = useState<Timestamp | null>(null);
  const [data_fi, setFi] = useState<Timestamp | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInitiPicker, setShowInitiPicker] = useState(false);
  const [showFiPicker, setShowFiPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { unitat_id, sortida } = useLocalSearchParams<{
    unitat_id?: string;
    sortida?: string;
  }>();

  useEffect(() => {
    if (sortida) {
      const s = JSON.parse(sortida) as MODEL.Sortida;
      setUbicacio(s.ubicacio);
      setDesc(s.descripcio);
      setInici(s.data_inici);
      setFi(s.data_fi);
      settitle("Edita sortida");
    }
  }, [sortida]);
  const save = async () => {
    if (!ubicacio || !data_inici || !data_fi || !descripcio)
      return Alert.alert("Omple tots els camps");
    if (!unitat_id) return Alert.alert("Error", "Unitat no trobada");
    if (data_inici >= data_fi)
      return Alert.alert(
        "Error",
        "La data d'inici ha de ser anterior a la de fi",
      );
    setError(null);
    try {
      setLoading(true);
      const response = await saveSortida({
        unitat_id,
        ubicacio,
        descripcio,
        data_inici,
        data_fi,
      });
      router.replace({
        pathname: "/(app)/(aeig)/(unitat)/sortides",
        params: { unitat_id },
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al guardar la sortida",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInitiChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) return;

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: selectedDate,
        mode: "time",
        is24Hour: true,
        onChange: (e, selectedTime) => {
          if (selectedTime) {
            const iniciDate = new Date(selectedDate);
            iniciDate.setHours(selectedTime.getHours());
            iniciDate.setMinutes(selectedTime.getMinutes());
            setInici(iniciDate.getTime() as Timestamp);
          }
        },
      });
    } else {
      setInici(selectedDate.getTime() as Timestamp);
    }
    setShowInitiPicker(false);
  };

  const handleFiChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) return;
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: selectedDate,
        mode: "time",
        is24Hour: true,
        onChange: (e, selectedTime) => {
          if (selectedTime) {
            const finalDate = new Date(selectedDate);
            finalDate.setHours(selectedTime.getHours());
            finalDate.setMinutes(selectedTime.getMinutes());
            setFi(finalDate.getTime() as Timestamp);
          }
        },
      });
    } else {
      setFi(selectedDate.getTime() as Timestamp);
    }
    setShowFiPicker(false);
  };

  if (error) return <ErrorScreen message={error} />;
  if (loading) return <LoadingScreen />;
  return (
    <View style={styles.container}>
      <ThemedText type="title">{title}</ThemedText>

      <ThemedText style={styles.label}>Ubicació</ThemedText>
      <TextInput
        placeholder="Ubicació"
        style={styles.input}
        value={ubicacio}
        onChangeText={setUbicacio}
      />

      <ThemedText style={styles.label}>Descripció</ThemedText>
      <TextInput
        placeholder="Descripció"
        style={styles.input_multiline}
        value={descripcio}
        onChangeText={setDesc}
        multiline
        numberOfLines={3}
      />

      <ThemedText style={styles.label}>Data i hora d'inici</ThemedText>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowInitiPicker(true)}
      >
        <ThemedText style={{ fontSize: 14, fontWeight: "400" }}>
          {(data_inici &&
            `${formatDate(new Date(data_inici))} ${new Date(data_inici).toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" })}`) ||
            "Selecciona data i hora d'inici"}
        </ThemedText>
      </TouchableOpacity>
      {showInitiPicker && (
        <DateTimePicker
          value={data_inici ? new Date(data_inici) : new Date()}
          mode={Platform.OS === "ios" ? "datetime" : "date"}
          display="default"
          onChange={(event, selectedDate) => {
            if (Platform.OS === "android") {
              setShowInitiPicker(false);
            }
            handleInitiChange(event, selectedDate);
          }}
        />
      )}

      <ThemedText style={styles.label}>Data i hora de fi</ThemedText>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowFiPicker(true)}
      >
        <ThemedText style={{ fontSize: 14, fontWeight: "400" }}>
          {(data_fi &&
            `${formatDate(new Date(data_fi))} ${new Date(data_fi).toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" })}`) ||
            "Selecciona data i hora de fi"}
        </ThemedText>
      </TouchableOpacity>
      {showFiPicker && (
        <DateTimePicker
          value={data_fi ? new Date(data_fi) : new Date()}
          mode={Platform.OS === "ios" ? "datetime" : "date"}
          display="default"
          onChange={(event, selectedDate) => {
            if (Platform.OS === "android") {
              setShowFiPicker(false);
            }
            handleFiChange(event, selectedDate);
          }}
        />
      )}

      <SaveIcon onPress={save} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "800",
  },

  input: {
    color: LIGHT,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    borderRadius: 10,
    padding: 12,
    minHeight: 50,
  },
  input_multiline: {
    color: LIGHT,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top", // align text to top for multiline
  },

  dateInput: {
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    borderRadius: 10,
    padding: 12,
    height: 50,
    justifyContent: "center",
  },

  btn: {
    marginTop: 30,
    backgroundColor: LINK,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});
