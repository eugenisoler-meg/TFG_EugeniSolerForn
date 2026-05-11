import { Sortida } from '@/constants/model';
import { cleanResponse } from './utils';
import { Alert } from 'react-native';

const API_AIendpoint = 'https://testapi.escoltesiguies.cat/ai';
const AI_MODEL = 'gpt-5-mini';

export const generateSortidaText = async (item: Sortida) => {
  const ENDPOINT = "generateTextSortida";
  try{
    const response = await fetch(`${API_AIendpoint}/${ENDPOINT}?model=${AI_MODEL}&sortida=${encodeURIComponent(JSON.stringify(item))}`, 
      {method: "GET", headers: {"Content-Type": "application/json"},});
    const text = await cleanResponse(response);
    Alert.alert("Text generat", text);
  }
  catch(e){
    console.log(e);
  }


};