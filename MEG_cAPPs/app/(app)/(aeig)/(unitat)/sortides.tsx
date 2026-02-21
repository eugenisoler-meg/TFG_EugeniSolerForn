import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import { Sortida, SortidaCard } from "@/components/aeig/unitat/unitat-sortides";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AddIcon from "@/components/ui/add-icon";
import { getSortidesByUnitatID } from "@/constants/database";
import { User } from "@/constants/model";
import * as Utils from "@/constants/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, } from "react-native";
//import { openaiApiKey } from "@/constants/ai";

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
                const s = JSON.parse(await getSortidesByUnitatID(user.afiliat_id, unitat_id)) as Sortida[];
                setSortides(s as Sortida[]);
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
  const renderItem = ({ item }: { item: Sortida }) => {
  if (!item.sortida_id) return null;
    return <SortidaCard item={item} generateText={generateText} />;
  };

  /* ---------------------------
     Empty state
  ---------------------------- */
  const renderEmpty = () => (
    <ThemedView style={styles.empty}>
      <ThemedText type="subtitle">Encara no has planejat cap sortida</ThemedText>
    </ThemedView>
  );

  /* ---------------------------
     Screen
  ---------------------------- */
    if (loading) return LoadingScreen();
    if (error) return ErrorScreen(error??'Error desconegut.');

    return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sortides de la unitat</ThemedText>
      {(sortides.length > 0) && <FlatList
        data={sortides}
        keyExtractor={(item) => item.sortida_id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />}
      {(sortides.length === 0) && renderEmpty()}

      <AddIcon onPress={() => router.push({ pathname:"/(app)/(aeig)/(unitat)/sortida-form", params: {unitat_id}})}/> 
    </ThemedView>
  );
}


/* ---------------------------
   Styles
---------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  empty: {
    alignItems: "center",
    marginTop: 40,
  },
});