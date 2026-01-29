import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { router } from "expo-router";
import * as MODEL from './model';

export const __LLEI:string[] = [
    "Ens esforcem a merèixer confiança i fem confiança a tothom.",
    "Vivim la nostra fe i respectem les conviccions dels altres.",
    "Aprenem a ser útils i a fer servei.",
    "Som germans de tothom i treballem per la pau.",
    "Som fidels al nostre país i ens sentim ciutadans del món.",
    "Defensem la natura i protegim la vida.",
    "Aprenem a viure en equip i tot ho fem entre tots.",
    "Som decidits i afrontem les dificultats sense por.",
    "Estimem el treball i volem fer bé les coses.",
    "Aprenem a estimar i a jugar net."
];



export const parseDate = (d:Date|string|null):string => {
    if (d === null || d === undefined) return parseDate(new Date());
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date.toISOString().split('T')[0];
};

export const getUserLoggedIn = async () : Promise<MODEL.User | null> => {
    const USER = await AsyncStorage.getItem('USER');
    if (!USER) return null;
    return JSON.parse(USER) as MODEL.User;
};

export const storeUser = async (user: MODEL.User) : Promise<void> => {
    await AsyncStorage.setItem('USER', JSON.stringify(user));
};

export const clearUser = async () : Promise<void> => {
    await AsyncStorage.removeItem('USER');
};

export const tryLogin = async (dni : string, data_naixement : Date) => 
    fetch(`https://testapi.escoltesiguies.cat/login?dni=${dni}&data_naixement=${parseDate(data_naixement)}`, 
    {method: "GET", headers: {"Content-Type": "application/json"},});

export const confirmLogout = () => {
  Alert.alert(
        "Tanca la sessió",
        "Estàs segur que vols tancar la sessió?",
        [ { text: "Cancelar", style: "cancel", },
          { text: "Tanca la sessió", style: "destructive",
            onPress: async () => {
                await AsyncStorage.removeItem('USER');
                router.replace("/");
            },
        },
        ]
    );
};

export const fetchQuery = async (query: string, params: Record<string, string>) => {
    const url = new URL(`https://testapi.escoltesiguies.cat/fetch`);
    url.searchParams.append("q", query);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url.toString(), {method: "GET", headers: {"Content-Type": "application/json"},});
    // console.log("Fetching URL:", url.toString());
    return await cleanResponse(response);
};

export const cleanResponse = async (response: Response) => {
    const text = await response.text();
    text.replace("<pre></pre>", "");
    const json = JSON.parse(text);
    if(json.error) throw new Error(json.error || 'An error occurred while fetching data');
    // console.warn("API Response:", json);
    return json.success;
};
