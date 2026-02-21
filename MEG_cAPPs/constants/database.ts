import { fetchQuery, postMutation } from '@/constants/utils';
import * as MODEL from './model';

export const getPermisosNivell = async (afiliat_id: string) => fetchQuery('permisosNivell', {'afiliat_id': afiliat_id});
export const getAfiliatByAfiliatID = async (afiliat_id: string) => fetchQuery('afiliatByID', {'afiliat_id': afiliat_id});
export const getFuncionsByAfiliatID = async (afiliat_id: string) => fetchQuery('funcionsByAfiliat', {'afiliat_id': afiliat_id});

export const getUnitatsByAgrupamentID = async (afiliat_id:string, agrupament_id: string) => fetchQuery('unitatsByAgrupament', {'afiliat_id': afiliat_id, 'agrupament_id': agrupament_id});
export const getUnitatByID = async (afiliat_id:string, unitat_id: string) => fetchQuery('unitatByID', {'afiliat_id': afiliat_id, 'unitat_id': unitat_id});
export const getUnitatActivaByID = async (afiliat_id:string, unitat_id: string) => fetchQuery('unitatActivaByID', {'afiliat_id': afiliat_id, 'unitat_id': unitat_id});
export const getAgrupamentByID = async (afiliat_id:string, agrupament_id: string, demarcacio?:boolean) => fetchQuery(demarcacio? 'agrupamentDemarcacioByID': 'agrupamentByID', {'afiliat_id': afiliat_id, 'agrupament_id': agrupament_id});

export const getFuncionsByUnitatID = async (afiliat_id:string, unitat_id: string) => fetchQuery('funcionsByUnitatID', {'afiliat_id': afiliat_id, 'unitat_id': unitat_id});
export const getSortidesByUnitatID = async (afiliat_id:string, unitat_id: string) => fetchQuery('sortidesByUnitatID', {'afiliat_id': afiliat_id, 'unitat_id': unitat_id});
export const getLlistesByUnitatID = async (afiliat_id:string, unitat_id: string) => fetchQuery('llistesByUnitatID', {'afiliat_id': afiliat_id, 'unitat_id': unitat_id});

export const saveSortida = async (sortida: Omit<MODEL.Sortida, 'sortida_id'>) => await postMutation('sortida', sortida);

export const createLlista = async (llista: Omit<MODEL.Llista, 'llista_id' | 'assistencies_cau'>) => await postMutation('llistaNova', llista);
export const updateLlista = async (llista: MODEL.Llista) => await postMutation('llistaUpdate', llista);
export const updateAssistencies = async (assistencies: MODEL.AssistenciaCau[]) => await postMutation('assistenciaUpdate', assistencies);