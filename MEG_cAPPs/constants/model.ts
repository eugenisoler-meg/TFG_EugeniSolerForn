import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

export interface User {
    dni: string;
    permisos: number;
    ultim_login: Timestamp;
    login: Timestamp;
    data_naixement: Date;
    afiliat_id: string;
    afiliat?: Afiliat;
}
export type AfiliatTipusType = typeof AfiliatTipus[keyof typeof AfiliatTipus];
export const AfiliatTipus = {
    'cap_suport': 'Cap/Equip de Suport',
    'infant_jove': 'Infant/Jove',
    'familiar_tutor': 'Familiar/Tutor',
} as const;
export interface Afiliat {
    afiliat_id: string;
    nom:string;
    cognoms: string;
    dni: string| null;
    email: string| null;
    tlf: string | null;
    data_naixement: Date| null;
    num_moni: null| null;
    num_dire: null| null;
    tipus : AfiliatTipusType|null;
}
export type NivellType = typeof Nivell[keyof typeof Nivell];
export const Nivell = {
    agrupament: 'Agrupament',
    demarcacio: 'Demarcació',
    meg: 'MEG',
} as const;
export interface Funcio {
    funcio_id : string;
    afiliat_id: string;
    agrupament_id: string | null;
    nivell: NivellType;
    rol: string;
    grup: string | null;
    unitat_id: string | null;
    data_inici: Date;
    data_fi: Date | null;
    agrupament?: Agrupament;
    unitat?: Unitat;
    afiliat?: Afiliat;
}
export type BrancaKeys = keyof typeof Branca;
export type BrancaType = typeof Branca[BrancaKeys];
export const Branca = {
    'castors_lludrigues': 'Castors i Lludrigues',
    'llops_daines': 'Llops i Daines',
    'rangers_noies_guia': 'Rangers, Noies i Guies',
    'pioners_caraveles': 'Pioners i Caraveles',
    'trucs': 'Trucs',
} as const;
export interface Unitat{
    unitat_id: string;
    agrupament_id : string;
    ultim_update:Timestamp;
    nom: string;
    branca: BrancaType;
    created_at:Timestamp;
    updated_at:Timestamp;
    agrupament?: Agrupament;
}

export interface Agrupament{
    agrupament_id: string;
    demarcacio_id: string | null;
    email:string;
    adreça: string;
    ultim_update:Timestamp;
    updated_at:Timestamp;
    nom:string;
    num_cens?:string;
    lon?:number;
    lat?:number;
    demarcacio?: Agrupament;
}

export interface Sortida {
    sortida_id: string;
    unitat_id: string;
    ubicacio: string;
    descripcio: string;
    data_inici: Timestamp;
    data_fi: Timestamp;
    unitat?: Unitat;
}
export type TipusLlistaKeys = keyof typeof TipusLlista;
export type TipusLlistaType = typeof TipusLlista[TipusLlistaKeys];
export const TipusLlista = {
    cau: 'Caus',
    sortida: 'Sortides',
} as const;
export interface Llista {
    llista_id: string;
    unitat_id: string;
    data_llista: Date;
    tipus: TipusLlistaKeys;
    assistencies_cau: AssistenciaCau[] | [] ;
    unitat?: Unitat;
}
export type ValidacioAssistenciaKeys = keyof typeof ValidacioAssistencia;
export type ValidacioAssistenciaType = typeof ValidacioAssistencia[ValidacioAssistenciaKeys];
export const ValidacioAssistencia = {
    A : 'Assistència',
    J : 'Justificada',
    NJ : 'No Justificada'
} as const;
export interface AssistenciaCau {
    assistencia_id: number;
    afiliat_id: string;
    llista_id: string;
    validada: ValidacioAssistenciaKeys | null;
    afiliat?: Afiliat;
}