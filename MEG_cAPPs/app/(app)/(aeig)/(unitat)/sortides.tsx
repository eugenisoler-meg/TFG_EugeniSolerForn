import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import { Sortida } from "@/components/aeig/unitat/unitat-sortides";
import { getSortidesByUnitatID } from "@/constants/database";
import * as Utils from "@/constants/utils";
import { User } from "@/constants/model";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { View, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { formatDate } from "@/constants/utils";

export default function SortidesScreen()  {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [sortides, setSortides] = useState<Sortida[]>([]);
    const [user, setUser] = useState<User|null>(null);
    const { unitat_id } = useLocalSearchParams<{unitat_id?:string}>();
    
    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setLoading(true);
            try {   
                const user = await Utils.getUser();
                if (!user || !unitat_id) {
                    setError("La sessió no s'ha iniciat correctament.");
                    router.replace("../login");
                    return;
                }
                setUser(user as User);
                const s = await getSortidesByUnitatID(user.afiliat_id, unitat_id);
                setSortides(s as Sortida[]);
                console.log(s);
                
            } catch (e) {
                setError(e instanceof Error ? e.message : "Error desconegut.");
            }
            finally {
                setLoading(false);
            };
        }
        fetchData();
        }, [unitat_id]);

    

    /* ---------------------------
     Generate text action
  ---------------------------- */
  const generateText = useCallback((item: Sortida) => {
    const text = `
        Sortida
        Ubicació: ${item.ubicacio}
        Inici: ${Utils.formatDate(item.data_inici)}
        Fi: ${Utils.formatDate(item.data_fi)}
        Descripció: ${item.descripcio ?? "-"}
        `;

        Alert.alert("Text generat", text);
    }, []);

  /* ---------------------------
     Render each card
  ---------------------------- */
  const renderItem = ({ item }: { item: Sortida }) => item.sortida_id ? (
    <ThemedView style={styles.card}>
      <View style={{ flex: 1 }}>
        <ThemedText type="defaultSemiBold">{item.ubicacio}</ThemedText>
        <ThemedText>
          {formatDate(item.data_inici??new Date())} → {formatDate(item.data_fi??new Date())}
        </ThemedText>

        {item.descripcio && (
          <ThemedText style={styles.desc}>{item.descripcio}</ThemedText>
        )}
      </View>

      {/* Icon button */}
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => generateText(item)}
      >
        <Ionicons name="document-text-outline" size={24} />
      </TouchableOpacity>
    </ThemedView>
  ) : <></>;

  /* ---------------------------
     Empty state
  ---------------------------- */
  const renderEmpty = () => (
    <ThemedView style={styles.empty}>
      <ThemedText>No hi ha sortides</ThemedText>
    </ThemedView>
  );

  /* ---------------------------
     Screen
  ---------------------------- */
    if (loading) return LoadingScreen();
    if (error) return ErrorScreen(error??'Error desconegut.');
    const valid_id = sortides && sortides.length > 0 ? sortides.reduce((acc, s) => acc + (s.sortida_id?.length ?? 0), 0) : 0;
    return (
    <ThemedView style={styles.container}>
      {(valid_id) && <FlatList
        data={sortides}
        keyExtractor={(item) => item.sortida_id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />}
      {!valid_id && renderEmpty()}
      
      {/* Floating bottom button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(app)/(aeig)/(unitat)/sortida-form")}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
}


/* ---------------------------
   Styles
---------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },

  iconBtn: {
    padding: 10,
  },

  desc: {
    opacity: 0.6,
    marginTop: 4,
  },

  empty: {
    alignItems: "center",
    marginTop: 40,
  },

  /* Floating button */
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    elevation: 5,
  },
});