import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Paths } from 'expo-file-system';
import { router } from 'expo-router';
import * as Sharing from "expo-sharing";
import { fetch } from 'expo/fetch';
import { Alert, } from 'react-native';
import * as MODEL from './model';

const API = 'https://testapi.escoltesiguies.cat';

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
export function formatDate(date: Date|string) {
  const d = typeof date === 'string' ? new Date(date): date;
  return d.toLocaleDateString("ca-ES"); // or your locale
}

export const tryLogin = async (dni : string, data_naixement : Date) => 
    fetch(`${API}/login?dni=${dni}&data_naixement=${parseDate(data_naixement)}`, 
    {method: "GET", headers: {"Content-Type": "application/json"},});

export const fetchQuery = async (query: string, params: Record<string, string>) => {
    const url = new URL(`${API}/fetch`);
    url.searchParams.append("q", query);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url.toString(), {method: "GET", headers: {"Content-Type": "application/json"},});
    return await cleanResponse(response);
};

export const postMutation = async (endpoint: string, data: any) => {
    const response = await fetch(`${API}/post/${endpoint}`, {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)});
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

export const getAEiGs_ID = async () : Promise< string[] > => {
    try{
        const FUNCIONS = await AsyncStorage.getItem('AEiG_ID');
        return FUNCIONS ? JSON.parse(FUNCIONS) as string[]: [];
    }catch{
        return [];
    }
};
export const setAEiGs_ID = async (funcions: string[]) : Promise<void> => {await AsyncStorage.setItem('AEiG_ID', JSON.stringify(funcions));};
export const clearAEiGs_ID = async () : Promise<void> => {await AsyncStorage.removeItem('AEiG_ID');};

export const getUnitats_ID = async () : Promise< string[] > => {
    try{
        const FUNCIONS = await AsyncStorage.getItem('Unitats_ID');
        return FUNCIONS ? JSON.parse(FUNCIONS) as string[]: [];
    }catch{
        return [];
    }
};
export const setUnitats_ID = async (funcions: string[]) : Promise<void> => {await AsyncStorage.setItem('Unitats_ID', JSON.stringify(funcions));};
export const clearUnitats_ID = async () : Promise<void> => {await AsyncStorage.removeItem('Unitats_ID');};


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

export const logout = async() => {Promise.all([clearAfiliat(), clearFuncions(), clearUnitats_ID(), clearAEiGs_ID(), ])}; // TEST clearUser()]);}

export const funcioActiva = (f : MODEL.Funcio): boolean => {
    if(!f.data_inici || f.data_inici > new Date()) return false;
	else if(!f.data_fi || f.data_fi > new Date()) return true;
	else return false;
};


type CERTIFICATS = {
    funcio: "Certificat de funció",
    equip_agrupament: "Certificat d'equip d'agrupament",
}
export const generateCertificate = async (type : keyof CERTIFICATS, solicitant_id:string, params : { [key: string]: string }) => {
  const timestamp:string = String(new Date().getTime());
  let params_string:string = "";
  switch(type){
    case 'funcio':
        if(!params.funcio_id) throw new Error("Paràmetres no vàlids per a generar el certificat de la funció");
        params_string = `funcio_id=${params.funcio_id}`;
        break;
    case 'equip_agrupament':
        if(!params.agrupament_id) throw new Error("Paràmetres no vàlids per a generar el certificat de l'equip d'agrupament");
        params_string = `agrupament_id=${params.agrupament_id}`;
        break;
    default:
        throw new Error("Tipus de certificat no vàlid");
    }
    
    
    try {
        const file = new File(Paths.cache, "certificat_"+timestamp+".pdf");
        const res = await fetch(`${API}/certificat/${type}?solicitant_id=${solicitant_id}&${params_string}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },

        });
        file.write(await res.bytes());
        await Sharing.shareAsync(file.uri);
    } catch (err) {
        console.log(err);
    }
};