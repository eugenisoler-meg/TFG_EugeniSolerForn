import { fetchQuery } from '@/constants/utils';

export const getPermisosNivell = async (afiliat_id: string) => fetchQuery('permisosNivell', {'afiliat_id': afiliat_id});
export const getAfiliatByAfiliatID = async (afiliat_id: string) => fetchQuery('afiliatByID', {'afiliat_id': afiliat_id});
export const getFuncionsByAfiliatID = async (afiliat_id: string) => fetchQuery('funcionsByAfiliat', {'afiliat_id': afiliat_id});

export const getUnitatsByAgrupamentID = async (afiliat_id:string, agrupament_id: string) => fetchQuery('unitatsByAgrupament', {'afiliat_id': afiliat_id, 'agrupament_id': agrupament_id});
export const getUnitatByID = async (afiliat_id:string, unitat_id: string) => fetchQuery('unitatByID', {'afiliat_id': afiliat_id, 'unitat_id': unitat_id});
export const getAgrupamentByID = async (afiliat_id:string, agrupament_id: string) => fetchQuery('agrupamentByID', {'afiliat_id': afiliat_id, 'agrupament_id': agrupament_id});