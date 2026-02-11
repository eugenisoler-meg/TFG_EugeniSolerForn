import { useEffect, useState } from "react";
import * as MODEL from '@/constants/model';
import * as DATABASE from '@/constants/database';
import * as Utils from '@/constants/utils';
import { router } from 'expo-router';
import LoadingScreen from "@/app/loading";
import ErrorScreen from "@/app/error";
import {View, StyleSheet, FlatList } from 'react-native';
import AgrupamentCard, {AgrupamentDetails} from '@/components/aeig/agrupament-details'
import { ThemedText } from "@/components/themed-text";

export default function AgrupamentDashboardScreen(){
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState(true); 
    const [aeigs, setAEiGs] = useState<AgrupamentDetails[]>([]);
    const [user, setUser] = useState<MODEL.User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setError(null);
          try {
              const user = await Utils.getUser();
              if (!user) {
                  setError("La sessió no s'ha iniciat correctament.");
                  router.replace("../login");
                  return ;
              }
              setUser(user as MODEL.User);
              
              const AGRUPAMENTS_ID = await Utils.getAEiGs_ID();
              const AGRUPAMENTS:AgrupamentDetails[] = [];
              for(let i = 0; i<AGRUPAMENTS_ID.length; i++){
                  const aeig = JSON.parse(await DATABASE.getAgrupamentByID(user.afiliat_id, AGRUPAMENTS_ID[i], true)) as AgrupamentDetails;
                  AGRUPAMENTS.push(aeig);
              }
              setAEiGs(AGRUPAMENTS);

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

    if(loading) return LoadingScreen();
    if(error) return ErrorScreen(error);
    
  return (
    <View style={styles.container}>
      <ThemedText type="title">Agrupaments dels quals formes part:</ThemedText>
      <FlatList
        data={aeigs}
        keyExtractor={(item) => item.agrupament_id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AgrupamentCard
            agrupament={item}
            onPress={() => router.push({pathname: './aeig', params:{ agrupament_id: item.agrupament_id}})
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    width: '100%',
    justifyContent: "space-evenly",

  },
});
