import { router } from 'expo-router';
import * as MODEL from './model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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

export const tryLogin = async (dni : string, data_naixement : Date) => 
    fetch(`https://testapi.escoltesiguies.cat/login?dni=${dni}&data_naixement=${parseDate(data_naixement)}`, 
    {method: "GET", headers: {"Content-Type": "application/json"},});

export const fetchQuery = async (query: string, params: Record<string, string>) => {
    const url = new URL(`https://testapi.escoltesiguies.cat/fetch`);
    url.searchParams.append("q", query);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url.toString(), {method: "GET", headers: {"Content-Type": "application/json"},});
    return await cleanResponse(response);
};

export const cleanResponse = async (response: Response) => {
    const text = await response.text();
    text.replace("<pre></pre>", "");
    const json = JSON.parse(text);
    if(json.error) throw new Error(json.error || 'An error occurred while fetching data');

    return json.success;
};

export const anysFuncions = (funcions: MODEL.Funcio[]) : number => funcions.reduce((acc, f) => {
    const inici = new Date(f.data_inici).getTime();
    const fi = f.data_fi ? new Date(f.data_fi).getTime() : new Date().getTime();
    const diff = (fi - inici)/(1000 * 60 * 60 * 24 * 365.25);
    return acc + diff;
 } , 0);




// Utils for local storage
export const getUser = async (): Promise<MODEL.User | null> => {
  try {
    const USER = await AsyncStorage.getItem('USER');
    return USER ? JSON.parse(USER) as MODEL.User : null;
  } catch {
    return null;
  }
};
export const setUser = async (user: MODEL.User) : Promise<void> => {await AsyncStorage.setItem('USER', JSON.stringify(user));};
export const clearUser = async () : Promise<void> => {await AsyncStorage.removeItem('USER');};

export const getAfiliat = async () : Promise<MODEL.Afiliat | null> => {
    try{
        const AFILIAT = await AsyncStorage.getItem('AFILIAT');
        return AFILIAT ? JSON.parse(AFILIAT) as MODEL.Afiliat : null;
    }catch{
        return null
    }
};
export const setAfiliat = async (afiliat: MODEL.Afiliat) : Promise<void> => {await AsyncStorage.setItem('AFILIAT', JSON.stringify(afiliat));};
export const clearAfiliat = async () : Promise<void> => {await AsyncStorage.removeItem('AFILIAT');};

export const getFuncions = async () : Promise<MODEL.Funcio[] > => {
    try{
        const FUNCIONS = await AsyncStorage.getItem('FUNCIONS');
        return FUNCIONS ? JSON.parse(FUNCIONS) as MODEL.Funcio[] : [];
    }catch{
        return [];
    }
};
export const setFuncions = async (funcions: MODEL.Funcio[]) : Promise<void> => {await AsyncStorage.setItem('FUNCIONS', JSON.stringify(funcions));};
export const clearFuncions = async () : Promise<void> => {await AsyncStorage.removeItem('FUNCIONS');};

export const confirmLogout = async () => {
    Alert.alert(
          "Tanca la sessió",
          "Estàs segur que vols tancar la sessió?",
          [ { text: "Cancelar", style: "cancel", },
            { text: "Tanca la sessió", style: "destructive",
              onPress: async () => {
                logout();
                router.replace("/login");
              },
          },
          ]
      );
  };
export const DAY_MILLIS = 24*60*60*1000; 
export const logout = async() => {Promise.all([clearAfiliat(), clearFuncions(), clearUser()]);}