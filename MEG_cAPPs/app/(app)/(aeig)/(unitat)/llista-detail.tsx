import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import { ThemedText } from "@/components/themed-text";
import { SaveIcon } from "@/components/ui/add-icon";
import { showUnsavedChangesAlert, Success } from "@/components/ui/alerts";
import {
  ColorsAssistencia,
  renderRadioButtons,
} from "@/components/ui/radio-buttons";
import * as DATABASE from "@/constants/database";
import * as MODEL from "@/constants/model";
import { AssistenciaCau, ValidacioAssistenciaKeys } from "@/constants/model";
import * as Utils from "@/constants/utils";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

export default function LlistaDetailScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<MODEL.User | null>(null);
  const assistencies_cau_string = useLocalSearchParams<{
    assistencies_cau?: string;
  }>().assistencies_cau;
  const [data, setData] = useState<MODEL.AssistenciaCau[]>([]);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setError(null);
      try {
        const user = await Utils.getUser();
        if (!user) {
          setError("La sessió no s'ha iniciat correctament.");
          router.replace("../login");
          return;
        }
        setUser(user as MODEL.User);
        if (!assistencies_cau_string)
          setError("No s'han passat les assistències correctament.");
        else {
          const assistencies_cau = JSON.parse(
            assistencies_cau_string,
          ) as MODEL.AssistenciaCau[];
          setData(assistencies_cau);
        }
      } catch (e) {
        console.log(e);
        if (e instanceof Error) setError(e.message);
        else setError("S'ha produït un error desconegut.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [assistencies_cau_string]);

  const navigation = useNavigation();
  useEffect(() => {
    if (!modified) return;

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault(); // stop navigation
      showUnsavedChangesAlert(navigation, e);
    });

    return unsubscribe;
  }, [navigation, modified]);

  const changeState = (id: number, newState: ValidacioAssistenciaKeys) => {
    setData((prev) =>
      prev.map((a) =>
        a.assistencia_id === id
          ? { ...a, validada: a.validada === newState ? null : newState }
          : a,
      ),
    );
    setModified(true);
  };
  const renderItem = ({ item }: { item: AssistenciaCau }) => (
    <View style={styles.row}>
      <Text
        style={[
          styles.name,
          { color: item.validada ? ColorsAssistencia[item.validada] : "white" },
        ]}
      >
        {item.afiliat?.nom} {item.afiliat?.cognoms}
      </Text>
      <View style={styles.radioGroup}>
        {renderRadioButtons(item, changeState)}
      </View>
    </View>
  );
  const save = async () => {
    try {
      await DATABASE.updateAssistencies(data);
      setModified(false);
      Success("Assistències actualitzades", router);
    } catch (err) {
      Alert.alert("Error actualitzant l'assistència", String(err));
    }
  };

  if (error || !user)
    return <ErrorScreen message={error ?? "Error desconegut."} />;
  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <ThemedText type="title">Passa llista</ThemedText>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.assistencia_id)}
        renderItem={renderItem}
        ListHeaderComponent={header(data)}
      />
      <SaveIcon onPress={save} />
    </View>
  );
}

const header = (assistencies?: MODEL.AssistenciaCau[]) => (
  <View style={{ borderColor: "#eee", borderBottomWidth: 1 }}>
    <View style={[styles.header]}>
      <View />
      <View style={styles.radioGroup}>
        <ThemedText type="subtitle">
          {" "}
          {assistencies && assistencies.length > 0
            ? String(
                assistencies.reduce(
                  (acc, curr) => acc + (curr.validada === "A" ? 1 : 0),
                  0,
                ),
              )
            : 0}{" "}
        </ThemedText>
        <ThemedText type="subtitle">
          {" "}
          {assistencies && assistencies.length > 0
            ? String(
                assistencies.reduce(
                  (acc, curr) => acc + (curr.validada === "J" ? 1 : 0),
                  0,
                ),
              )
            : 0}{" "}
        </ThemedText>
        <ThemedText type="subtitle">
          {" "}
          {assistencies && assistencies.length > 0
            ? String(
                assistencies.reduce(
                  (acc, curr) => acc + (curr.validada === "NJ" ? 1 : 0),
                  0,
                ),
              )
            : 0}{" "}
        </ThemedText>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  border: { borderColor: "#000000", borderWidth: 2, margin: 5 },
  container: { flex: 1, padding: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginRight: 10,
    padding: 2,
  },
  radioGroup: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#555",
  },
  saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
