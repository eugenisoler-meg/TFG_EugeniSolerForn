import ToDoScreen from "@/app/todo";
import * as Utils from "@/constants/utils";
import * as MODEL from "@/constants/model";
import * as DATABASE from "@/constants/database";
import {router} from 'expo-router';
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, } from "react-native";

import UnitatsActives, {UnitatCard} from "@/components/aeig/unitats-actives";
import FuncionsEA from "@/components/aeig/funcions-ea";
import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";

const { width } = Dimensions.get("window");

export default function AgrupamentIndex() {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null); 
    const [funcions, setFuncions] = useState<MODEL.Funcio[]>([]);
    const [AEiGs, setAEiGs] = useState<MODEL.Agrupament[]>([]);
    const [unitats, setUnitats] = useState<MODEL.Unitat[]>([]);

    const [user, setUser] = useState<MODEL.User | null>(null);
    
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

            const FUNCIONS = await Utils.getFuncions() as MODEL.Funcio[];
            setFuncions(FUNCIONS);
            
            const agrupament_id  = await Utils.getAEiGs_ID();
            let aeigs : MODEL.Agrupament[] = [];
            for(let i = 0; i < agrupament_id.length; i++){
                const aeig = JSON.parse(await DATABASE.getAgrupamentByID(user.afiliat_id, agrupament_id[i])) as MODEL.Agrupament;
                aeigs.push(aeig);
            }
            setAEiGs(aeigs as MODEL.Agrupament[]);
            
            const unitat_id  = await Utils.getUnitats_ID();
            let unitats : MODEL.Unitat[] = [];
            for(let i = 0; i < unitat_id.length; i++){
                const unitat = JSON.parse(await DATABASE.getUnitatByID(user.afiliat_id, unitat_id[i])) as MODEL.Unitat;
                unitats.push(unitat);
            }
            setUnitats(unitats as MODEL.Unitat[]);


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

    if(error || !user) return ErrorScreen(error??'Error desconegut.');
    if(loading) return LoadingScreen();

    const permisos = {
        rp: (user.permisos & 32) > 0,
        secre: (user.permisos & 64) > 0,
        tresu: (user.permisos & 128) > 0,
        cons: (user.permisos & 256) > 0,
        cap_agrupament: (user.permisos & 512) > 0,
    };
    const unitatCards:UnitatCard[] = unitats.map(unitat => {
        const aeig = AEiGs.find((a) => a.agrupament_id === unitat.agrupament_id);

        return {
            id: unitat.unitat_id,
            unitat_nom: unitat.nom,
            aeig_nom: aeig?.nom ?? '-',
            branca: unitat.branca,
        };
    });
    
    return <View style={styles.container}>
        <View style={styles.topHalf}>
            <UnitatsActives unitats={unitatCards}></UnitatsActives>
        </View>
        <View style={styles.bottomHalf}>
            <FuncionsEA permisos={permisos}></FuncionsEA>
        </View>
    </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1,
    padding: 12,
    justifyContent: "space-evenly",
  },
  topHalf: {
    justifyContent: "space-evenly",
    flex: 1,
    },
});