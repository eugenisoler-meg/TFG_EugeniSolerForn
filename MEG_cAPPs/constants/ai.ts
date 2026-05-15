import { Sortida } from '@/constants/model';
import * as Clipboard from "expo-clipboard";
import { Alert } from 'react-native';

const API_AIendpoint = 'https://testapi.escoltesiguies.cat/ai';
const AI_MODEL = 'gpt-5.4-mini';
const formatter = new Intl.DateTimeFormat("ca-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "numeric",
  minute: "2-digit",
});
export const generateSortidaText = async (item: Sortida) => {
  const data_inici_format = item.data_inici ? formatter.format(new Date(item.data_inici)) : "Inici no especificat";
  const data_fi_format = item.data_fi ? formatter.format(new Date(item.data_fi)) : "Final no especificat";
  const response = await fetch(`${API_AIendpoint}/generateTextSortida`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ubicacio: item.ubicacio,
      descripcio: item.descripcio,
      data_inici: data_inici_format ,
      data_fi: data_fi_format,
      unitat_id: item.unitat_id,
      model: AI_MODEL,
    }),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  await Clipboard.setStringAsync(data.success);
  Alert.alert("TEXT COPIAT AL PORTA-RETALLS ✔️", data.success);
};
