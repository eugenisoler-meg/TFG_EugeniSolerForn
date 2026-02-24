import { Sortida } from '@/constants/model';
import { cleanResponse } from './utils';
import { Alert } from 'react-native';


const LEMES: {[key:string]:string} = {
  infant_castors_lludrigues : 'Riu amunt! 🧡',
  infant_llops_daines : 'Tant com puc! 💛',
  infant_rangers_noies_guia : 'Sempre a punt! 💙',
  infant_pioners_caraveles : 'Treball en equip! ❤️',
  infant_truc : 'Fem servei! 💚',
  '': 'UNITAT SENSE BRANCA'
};
const API_AIendpoint = 'https://testapi.escoltesiguies.cat/testAI';
const AI_MODEL = 'gpt-5-mini';

export const generateSortidaText = async (item: Sortida) => {
  console.log(item.unitat);
  const prompt = `Genera un missatge preparat per copiar i enganxar en un grup de whatsapp de famílies sobre una unitat d'infants d'un agrupament escolta i guia de catalunya que se'n va d'excursió.
Cal incloure la següent informació:
- Unitat name: ${item.unitat?.nom}
- Unitat i branca: ${item.unitat?.nom} ${item.unitat?.branca}
- Lloc: ${item.ubicacio}
- Data i hora d'inici: ${new Date(item.data_inici).toLocaleString()}
- Data i hora de fi: ${new Date(item.data_fi).toLocaleString()}
- Breu descripció de les activitats a realitzar (complementa una mica): ${item.descripcio}
Fes servir emoticones i destaca informació important. Fes-ho entenedor, un punt emotiu i fàcil de llegir. Acaba amb el lema de la branca: ${LEMES[item.unitat?.branca??'']}`;

  try{
    const response = await fetch(`${API_AIendpoint}?model=${AI_MODEL}&prompt=${encodeURI(prompt)}`, 
      {method: "GET", headers: {"Content-Type": "application/json"},});
    const text = await cleanResponse(response);
    Alert.alert("Text generat", text);
  }
  catch(e){
    console.log(e);
  }


};