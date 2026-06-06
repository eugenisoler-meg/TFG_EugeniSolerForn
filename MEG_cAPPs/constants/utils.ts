import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { File, Paths } from 'expo-file-system';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as Sharing from "expo-sharing";
import { fetch } from 'expo/fetch';
import { Alert, Linking } from 'react-native';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';
import * as MODEL from './model';

const normalizeUrl = (value?: string | null) => {
  if (!value || typeof value !== 'string') return value;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value.replace(/^\/+/, '')}`;
};

const API = normalizeUrl((Constants.expoConfig?.extra as any)?.API_URL);

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
export function formatDate(date: Date|string|Timestamp): string {
  const d = new Date(date);
  return d.toLocaleDateString("ca-ES"); // or your locale
}

const DEVICE_KEY = 'DISPOSITIU_ID';

export const getDeviceId = async (): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(DEVICE_KEY);
    } catch {
        return null;
    }
};
export const setDeviceId = async (id: string) => {
    try {
        await SecureStore.setItemAsync(DEVICE_KEY, id);
    } catch (e) {
        console.log(e);
    }
};
export const deleteDeviceId = async () => {
    try {
        await SecureStore.deleteItemAsync(DEVICE_KEY);
    } catch {}
};

export const tryLogin = async (dni: string, data_naixement: Date, dispositiu_id?: string) => {
    let url = `${API}/login?dni=${encodeURIComponent(dni)}&data_naixement=${encodeURIComponent(parseDate(data_naixement))}`;
    if (dispositiu_id) url += `&dispositiu_id=${encodeURIComponent(dispositiu_id)}`;
    const res = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    const text = await res.text();
    const cleanedText = text.replace("<pre></pre>", "");
    const json = JSON.parse(cleanedText);
    // Unwrap success envelope if present
    if (json.success) {
        return json.success;
    } else if (json.error) {
        if(json.error === "Dispositiu no reconegut") {
            await deleteDeviceId();
        }
        return { error: json.error };
    }
    return json;
};

export const checkOTP = async (challenge_id: string, otp: string, trust30?: boolean, dispositiu_id?: string) => {
    let url = `${API}/check_otp?challenge_id=${encodeURIComponent(challenge_id)}&otp=${encodeURIComponent(otp)}`;
    if (trust30) url += `&trust_days=30`;
    if (dispositiu_id) url += `&dispositiu_id=${encodeURIComponent(dispositiu_id)}`;
    const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const text = await res.text();
    const cleanedText = text.replace("<pre></pre>", "");
    const json = JSON.parse(cleanedText);
    // Unwrap success envelope if present
    if (json.success) {
        return json.success;
    } else if (json.error) {
        return { error: json.error };
    }
    return json;
};

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
    const cleanedText = text.replace("<pre></pre>", "");
    const json = JSON.parse(cleanedText);    
    if(json.error) throw new Error(json.error || 'An error occurred while fetching data');
    return json.success;
};

export const finalizeLogin = async (data: any) => {
    // Lazy import to avoid circular dependency
    const DATABASE = await import('../constants/database');
    
    const USER = JSON.parse(data.user) as MODEL.User;
    const AEiGs = JSON.parse(data.agrupaments) as string[];
    const Unitats = JSON.parse(data.unitats) as string[];
    await setUser(USER);

    const [afiliat_string, funcions_string] = await Promise.all([
        DATABASE.getAfiliatByAfiliatID(USER.afiliat_id),
        DATABASE.getFuncionsByAfiliatID(USER.afiliat_id),
    ]);

    const afiliat_parsed = JSON.parse(afiliat_string) as MODEL.Afiliat;
    const funcions_parsed = JSON.parse(funcions_string) as MODEL.Funcio[];
    await Promise.all([
        setFuncions(funcions_parsed),
        setAfiliat(afiliat_parsed),
        setAEiGs_ID(AEiGs),
        setUnitats_ID(Unitats),
    ]);
    Alert.alert(
        "SESSIÓ INICIADA",
        `Hola, ${afiliat_parsed.nom} ${afiliat_parsed.cognoms}! \n :)`,
    );

    router.replace("./(app)/dashboard");
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
export function properDissabte(): Date {
  var now = new Date()
  var dissabte = new Date(
                 now.getFullYear(),
                 now.getMonth(),
                 now.getDate() + (7 + 6 - now.getDay()) % 7,
                 23, 59, 59, 999);
  if (dissabte < now) dissabte.setDate(dissabte.getDate() + 7)
  return dissabte;
}
export const logout = async() => {Promise.all([clearAfiliat(), clearFuncions(), clearUnitats_ID(), clearAEiGs_ID(), clearUser()]);}

export const funcioActiva = (f : MODEL.Funcio): boolean => {
    if(!f.data_inici || f.data_inici > new Date()) return false;
	else if(!f.data_fi || f.data_fi > new Date()) return true;
	else return false;
};


type CERTIFICATS = {
    funcio: "Certificat de funció",
    equip_agrupament: "Certificat d'equip d'agrupament",
}
export const generateCertificate = async (type : keyof CERTIFICATS, solicitant_id:string, params : { [key: string]: string|null }) => {
  const timestamp:string = String(new Date().getTime());
  let params_string:string = "";
  switch(type){
    case 'funcio':
        if(!params.funcio_id) throw new Error("Paràmetres no vàlids per a generar el certificat de la funció");
        params_string = `funcio_id=${params.funcio_id}`;
        break;
    case 'equip_agrupament':
        if(!params.agrupament_id) throw new Error("Paràmetres no vàlids per a generar el certificat de l'equip d'agrupament");
        params_string = `funcio_id=${params.funcio_id}`;
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
    } catch (e) {
        console.log(e);
    }
};

export async function openExternalURL(url:string): Promise<void> {
    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`No s'ha pogut obrir l'enllaç: ${url}`);
    }
}
