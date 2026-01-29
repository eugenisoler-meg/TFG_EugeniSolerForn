import { fetchQuery } from '@/constants/utils';

export const getPermisosNivell = async (afiliat_id: string) => fetchQuery('permisosNivell', {'afiliat_id': afiliat_id});
export const getAfiliatByAfiliatID = async (afiliat_id: string) => fetchQuery('afiliatByID', {'afiliat_id': afiliat_id});
export const getFuncionsByAfiliatID = async (afiliat_id: string) => fetchQuery('funcionsByAfiliat', {'afiliat_id': afiliat_id});