import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";
import * as DATABASE from "@/constants/database";
import * as STYLES from "@/constants/styles";

import { router } from "expo-router";
import ErrorScreen from "../error";
import LoadingScreen from "../loading";

export default function Profile() {
  const [history, setHistory] = useState<MODEL.Funcio[]>([]);
  const [user, setUser] = useState<MODEL.User | null>(null);
  const [afiliat, setAfiliat] = useState<MODEL.Afiliat | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setError(null);
      try {
        const USER = await Utils.getUserLoggedIn();

        if (!USER) {
          router.replace("/login");
          return;
        }

        setUser(USER);

        const AFILIAT = JSON.parse(await DATABASE.getAfiliatByAfiliatID(USER.afiliat_id)) as MODEL.Afiliat;
        setAfiliat(AFILIAT);

        const HISTORY = JSON.parse(await DATABASE.getFuncionsByAfiliatID(USER.afiliat_id)) as MODEL.Funcio[];
        setHistory(HISTORY);

      } catch (e) {
        console.log(e);
        if (e instanceof Error)
          setError(e.message);
        else setError("S'ha produït un error desconegut.");
  
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ conditional rendering only (NO hooks here)
  if (loading) return <LoadingScreen />;
  if (error) return ErrorScreen(error);
  if (!user || !afiliat) return ErrorScreen("Error carregant dades");


  const SmallCard = ({
    title,
    enabled,
    titol,
    color,
  }: {
    title: string;
    enabled: boolean;
    titol?: string|number|null;
    color?: string;
  }) => (
    <View style={[styles.smallCard, !enabled && styles.disabled, color && { backgroundColor: color } ]}>
      <Text style={styles.smallCardText}>{title}</Text>
      {titol && <Text style={styles.smallCardTextSmall}>{titol}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* MAIN PROFILE CARD */}
      <View style={styles.profileCard}>
        <Text style={styles.name}>{afiliat.nom + ' ' + afiliat.cognoms} ({afiliat.dni})</Text>
        <Text>{afiliat.email} · {afiliat.tlf}</Text>
      </View>

      {/* small info text */}
      <Text style={styles.infoText}> Si alguna informació no és correcta, contacta amb la secretaria del teu agrupament. </Text>

      {/* row of 2 cards */}
      <View style={styles.row}>
        <SmallCard title="Monitoratge" enabled={afiliat.num_moni??false} titol={afiliat.num_moni} color="#77DD77"/>
        <SmallCard title="Direcció" enabled={afiliat.num_dire??false} titol={afiliat.num_dire} color="#FDFD96"/>
      </View>

      {/* history button */}
      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => setShowHistory(!showHistory)}
      >
        <Text style={styles.historyText}>Currículum Escolta</Text>
      </TouchableOpacity>

      {/* history table */}
      {showHistory && (
        <FlatList
          data={history}
          keyExtractor={(item) => item.funcio_id}
          style={styles.table}
          renderItem={({ item }) => (
            <View style={[styles.rowItem, item.rol === "infant" && { backgroundColor: STYLES.BRANCA_COLORS[item.grup] }]}>
              <Text style={styles.cell}>{STYLES.MAP_LABELS[item.rol]}</Text>
              <Text style={styles.cell}>{STYLES.MAP_LABELS[item.grup]}</Text>
              <Text style={styles.cell}>{Utils.parseDate(item.data_inici)}</Text>{/*{item.data_inici.toDateString()}</Text>*/}
              <Text style={styles.cell}>{item.data_fi?Utils.parseDate(item.data_fi):''}</Text>{/*{item.data_inici.toDateString()}</Text>*/}
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={[styles.rowItem, styles.header]}>
              <Text style={styles.cell}>Funció</Text>
              <Text style={styles.cell}>Grup</Text>
              <Text style={styles.cell}>Data d'inici</Text>
              <Text style={styles.cell}>Data de fi</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  profileCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    elevation: 3,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  infoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    color: "#333",
    gap: 10,
    marginBottom: 20,
  },

  smallCard: {
    flex: 1,
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  smallCardText: {
    color: "white",
    fontWeight: "600",
  },
  smallCardTextSmall: {
    color: "white",
    fontWeight: "400",
  },

  disabled: {
    opacity: 0.35,
  },

  historyBtn: {
    alignSelf: "center",
    paddingVertical: 10,
  },

  historyText: {
    color: "#4f46e5",
    fontWeight: "600",
  },

  table: {
    marginTop: 10,
  },

  rowItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },

  header: {
    backgroundColor: "#f3f4f6",
  },

  cell: {
    flex: 1,
    fontSize: 12,
  },
});
