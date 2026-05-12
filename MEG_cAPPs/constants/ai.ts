import { Sortida } from '@/constants/model';
import * as Clipboard from "expo-clipboard";
import { Alert } from 'react-native';

const API_AIendpoint = 'https://testapi.escoltesiguies.cat/ai';
const AI_MODEL = 'gpt-5-mini';

export const generateSortidaText = async (item: Sortida) => {
  const response = await fetch(`${API_AIendpoint}/generateTextSortida`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ubicacio: item.ubicacio,
      descripcio: item.descripcio,
      data_inici: item.data_inici ? new Date(item.data_inici).toLocaleDateString("ca-ES") : "Data d'inici no especificada",
      data_fi: item.data_fi ? new Date(item.data_fi).toLocaleDateString("ca-ES") : "Data de fi no especificada",
      unitat_id: item.unitat_id,
      model: AI_MODEL,
    }),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    console.log(response.text);
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  await Clipboard.setStringAsync(data.success);
  Alert.alert("COPIAT ✔️", "TEXT COPIAT AL PORTA-RETALLS:"+data.success);
};
