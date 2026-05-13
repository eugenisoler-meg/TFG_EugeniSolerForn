import ErrorScreen from '@/app/error';
import LoadingScreen from "@/app/loading";
import FuncionsUnitat, { FuncioUnitat } from '@/components/aeig/unitat/unitat-infants';
import * as DATABASE from "@/constants/database";
import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function UnitatIndex() {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [funcions, setFuncions] = useState<FuncioUnitat[]>([]);
    const [user, setUser] = useState<MODEL.User | null>(null);
    const { unitat_id, funcio } = useLocalSearchParams<{unitat_id?:string, funcio?:string}>();
    const parsedFuncio = funcio ? JSON.parse(funcio) as MODEL.Funcio : null;

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
                if(!unitat_id) return;
                const response = await DATABASE.getFuncionsByUnitatID(user.afiliat_id, unitat_id );
                const FUNCIONS = response as FuncioUnitat[];
                setFuncions(FUNCIONS);
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
    }, [unitat_id]);
    if(error || !user) return ErrorScreen(error??'Error desconegut.');
    if(loading) return LoadingScreen();
    
    const page = { title: "Cap de branca", key: "cap_grups", selectable: true, data: [funcions.filter(f => f.afiliat_id === user.afiliat_id)]};
    return  <>
    <FuncionsUnitat funcions={funcions}></FuncionsUnitat>
    </>
}