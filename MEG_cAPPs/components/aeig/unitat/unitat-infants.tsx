import { DIRE, LIGHT_GRAY, MONI } from "@/constants/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "../../themed-text";
export default function FuncionsUnitat({
  funcions,
}: {
  funcions: FuncioUnitat[];
}) {
  funcions = funcions.sort((a, b) => {
    return (
      new Date(a.afiliat.data_naixement).getTime() -
      new Date(b.afiliat.data_naixement).getTime()
    );
  });
  const infants = funcions.filter((f) => f.rol === "infant");
  const caps = funcions.filter((f) => f.rol === "cap_grups");
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Equip de caps ({caps.length})</ThemedText>
      <FlatList
        style={{ marginBottom: 15, paddingHorizontal: 10 }}
        data={caps}
        keyExtractor={(item) => item.funcio_id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>
                {" "}
                {item.afiliat.nom} {item.afiliat.cognoms}
              </Text>
              <Text style={styles.dni}> {item.afiliat.dni ?? ""}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                width: 80,
                justifyContent: "flex-start",
              }}
            >
              {item.afiliat.num_dire && (
                <Text
                  style={{ backgroundColor: DIRE.color, color: DIRE.fontColor }}
                >
                  {" "}
                  D: {item.afiliat.num_dire}{" "}
                </Text>
              )}
              {!item.afiliat.num_dire && item.afiliat.num_moni && (
                <Text
                  style={{ backgroundColor: MONI.color, color: MONI.fontColor }}
                >
                  {" "}
                  M: {item.afiliat.num_moni}{" "}
                </Text>
              )}
            </View>
          </View>
        )}
      />
      <ThemedText type="subtitle">Infants ({infants.length})</ThemedText>
      <FlatList
        style={{ marginBottom: 15, paddingHorizontal: 10 }}
        data={infants}
        keyExtractor={(item) => item.funcio_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(app)/(aeig)/(unitat)/infant",
                params: { infant_id: item.afiliat_id },
              });
            }}
          >
            <View style={styles.row}>
              <Text style={styles.name}>
                {item.afiliat.nom} {item.afiliat.cognoms}
              </Text>

              <FontAwesome5
                name="arrow-alt-circle-right"
                size={20}
                color={LIGHT_GRAY}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export interface FuncioUnitat {
  funcio_id: string;
  nivell: string;
  rol: string;
  grup: string;
  data_inici: Date;
  data_fi: Date | null;

  unitat_id: string;
  unitat: {
    unitat_id: string;
    nom: string;
    branca: string;
  };

  agrupament_id: string;
  agrupament: {
    agrupament_id: string;
    nom: string;
  };

  afiliat_id: string;
  afiliat: {
    afiliat_id: string;
    nom: string;
    cognoms: string;
    data_naixement: Date;
    dni: string | null;
    num_moni: string | null;
    num_dire: string | null;
  };
}

const styles = StyleSheet.create({
  container: {
    //        flex: 1,
    padding: 12,
    marginTop: 20,
    height: "85%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderTopWidth: 0.8,
    borderColor: "#eee",
    color: "#eee",
  },
  name: {
    color: "#eee",
    fontWeight: "600",
    fontSize: 16,
  },
  dni: {
    color: "#eee",
    fontWeight: "300",
    fontSize: 14,
  },
});
