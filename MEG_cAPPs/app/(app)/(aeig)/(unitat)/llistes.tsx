import ToDoScreen from "@/app/todo";
import { useEffect, useState } from "react";
import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";
import * as DATABASE from "@/constants/database";
import { useLocalSearchParams, router } from "expo-router";
import LoadingScreen from "@/app/loading";
import ErrorScreen from "@/app/error";
import AddIcon from "@/components/ui/add-icon";

export default function LlistaScreen()  {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [llistes, setLlistes] = useState<MODEL.Llista[]>([]);
    const [user, setUser] = useState<MODEL.User|null>(null);
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

            const LLISTES = JSON.parse(await DATABASE.getLlistesByUnitatID(user.afiliat_id, unitat_id )) as MODEL.Llista[];
            setLlistes(LLISTES);
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

    return <AddIcon onPress={() => router.push({ pathname:"/(app)/(aeig)/(unitat)/llista-form", params: {unitat_id}})}/> ;
}