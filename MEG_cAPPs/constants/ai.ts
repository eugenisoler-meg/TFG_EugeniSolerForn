import { Sortida } from '@/constants/model';
import { cleanResponse } from './utils';
import { Alert } from 'react-native';



const API_AIendpoint = 'https://testapi.escoltesiguies.cat/testAI';
const AI_MODEL = 'gpt-5-mini';

export const generateSortidaText = async (item: Sortida) => {
  const prompt = `Genera un missatge preparat per copiar i enganxar en un grup de whatsapp de famílies sobre una unitat d'infants d'un agrupament escolta i guia de catalunya que se'n va d'excursió.
Cal incloure la següent informació:
- Unitat name: ${item.unitat?.nom}
- Unitat i branca (defineix el grup d'edat): ${item.unitat?.nom} ${item.unitat?.branca}
- Lloc: ${item.ubicacio}
- Data i hora d'inici: ${new Date(item.data_inici).toLocaleString()}
- Data i hora de fi: ${new Date(item.data_fi).toLocaleString()}
- Breu descripció de les activitats a realitzar (complementa una mica però no inventis res): ${item.descripcio}
Fes servir emoticones i destaca informació important. Fes-ho curt, entenedor, un punt emotiu i fàcil de llegir. Acaba amb el lema de la branca`;

  try{
    
    console.log(`${API_AIendpoint}?prompt=${encodeURI(prompt)}`);
    const response = await fetch(`${API_AIendpoint}?model=${AI_MODEL}&prompt=${encodeURI(prompt)}`, 
      {method: "GET", headers: {"Content-Type": "application/json"},});

    const text = await cleanResponse(response);
    console.log(text);
    Alert.alert("Text generat", text);
  }
  catch(e){
    console.log(e);
  }


};