import { Sortida } from '@/constants/model';
import OpenAI from 'openai';
import Constants from 'expo-constants';

export const openaiApiKey = Constants.expoConfig?.extra?.OPENAI_API_KEY;
// Create the client
const openai = new OpenAI({
  apiKey: openaiApiKey, // make sure this is set in your environment
});

export const generateSortidaText = async (sortida: Sortida) => {
  const prompt = `
    Generate a friendly message in catalan for a whatsapp group of parents about a scouts grup (unitat) trip.
    Include the following information:
    - Unitat name: ${sortida.unitat?.nom}
    - Unitat branca (age group): ${sortida.unitat?.branca}
    - Location: ${sortida.ubicacio}
    - Start: ${new Date(sortida.data_inici).toLocaleString()}
    - End: ${new Date(sortida.data_fi).toLocaleString()}
    - Short description (complement a little bit): ${sortida.descripcio}

    Use emojis to highlight important info. Make it concise, engaging and easy to read.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // or 'gpt-4', depending on your API access
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
  });

  return response.choices?.[0].message?.content ?? '';
};