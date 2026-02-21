import { useCallback, useState } from "react";
import * as MODEL       from "@/constants/model";
import * as Utils       from "@/constants/utils";
import * as DATABASE    from "@/constants/database";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import LoadingScreen from "@/app/loading";
import ErrorScreen from "@/app/error";
import AddIcon from "@/components/ui/add-icon";
import LlistaList, { filterByTipus, filterByToday } from "@/components/aeig/unitat/llista-card";
import { View , StyleSheet} from "react-native";
import { ThemedText } from "@/components/themed-text";

interface Props {
  llistes: MODEL.Llista[];
  onValidate: (llista_id: string) => void;
}

export default function LlistaScreen()  {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [llistes, setLlistes] = useState<MODEL.Llista[]>([]);
    const [user, setUser] = useState<MODEL.User|null>(null);
    const { unitat_id } = useLocalSearchParams<{unitat_id?:string}>();

    useFocusEffect(
        useCallback(() => {
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
                if(!unitat_id) return;
                const res = await DATABASE.getLlistesByUnitatID(user.afiliat_id, unitat_id );
                const LLISTES = JSON.parse(res) as MODEL.Llista[];
                setLlistes(LLISTES);
            } catch (e) {
                console.log(e);
                if (e instanceof Error) setError(e.message);
                else setError("S'ha produït un error desconegut.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
        }, [unitat_id])
    );

    if(error || !user) return ErrorScreen(error??'Error desconegut.');
    if(loading) return LoadingScreen();

    const todayList = filterByToday(llistes, new Date());
    const cauList = filterByTipus(llistes, 'cau');
    const sortidaList = filterByTipus(llistes, 'sortida');

    return (<View style={styles.container}>
        {/* Today Section */}
        <View style={{flex:1, maxHeight:130, marginVertical: 6, borderColor: '#eee', borderBottomWidth: 2, paddingBottom: 8}}>
            <ThemedText type="subtitle" >Avui</ThemedText>
            <LlistaList llistes={todayList} highlight={true}/>
        </View>

        {/* Cau Section */}
        <View style={{flex:1, marginVertical: 6, borderColor: '#eee', borderBottomWidth: 2, paddingBottom: 5}}>
            <ThemedText type="subtitle" >Caus</ThemedText>
            <LlistaList llistes={cauList} />
        </View>

        {/* Sortida Section */}
        <View style={{flex:1, marginVertical: 6, borderColor: '#eee', borderBottomWidth: 2, paddingBottom: 5}}>
            <ThemedText type="subtitle" >Sortides</ThemedText>
            <LlistaList llistes={sortidaList}/>
        </View>

        <AddIcon onPress={() => router.push({ pathname:"/(app)/(aeig)/(unitat)/llista-form", params: {unitat_id}})}/>
    </View>);
};

const styles = StyleSheet.create({
  container: { flex: 1,  },
  });