import { useLocalSearchParams, router } from "expo-router";
import * as DATABASE from "@/constants/database";
import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";
import FuncionsUnitat, { FuncioUnitat} from '@/components/aeig/infants-unitat';
import { useEffect, useState } from "react";
import ErrorScreen from '@/app/error';
import LoadingScreen from "@/app/loading";

export default function UnitatIndex() {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [funcions, setFuncions] = useState<FuncioUnitat[]>([]);
    const [user, setUser] = useState<MODEL.User | null>(null);
    const { unitat_id } = useLocalSearchParams<{unitat_id?:string}>();

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

            const FUNCIONS = JSON.parse(await DATABASE.getFuncionsByUnitatID(user.afiliat_id, unitat_id )) as FuncioUnitat[];
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
    
    return  <FuncionsUnitat funcions={funcions}></FuncionsUnitat>;
}