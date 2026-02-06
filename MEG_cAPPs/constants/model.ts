import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

export interface User {
    dni: string;
    permisos: number;
    ultim_login: Timestamp;
    login: Timestamp;
    data_naixement: Date;
    afiliat_id: string;
}

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
    tipus : 'cap_suport'| 'infant_jove' | 'familiar_tutor' |null;
}

export interface Funcio {
    funcio_id : string;
    afiliat_id: string;
    agrupament_id: string | null;
    nivell: 'agrupament' | 'demarcacio' | 'meg';
    rol: string;
    grup: string|null;
    unitat_id: string | null;
    data_inici: Date;
    data_fi: Date | null;
}

export interface Unitat{
    unitat_id: string;
    agrupament_id : string;
    ultim_update:Timestamp;
    nom: string;
    branca: 'castors_lludrigues'|'llops_daines'|'rangers_noies_guia'|'pioners_caraveles'|'trucs';
    created_at:Timestamp;
    updated_at:Timestamp;
}

export interface Agrupament{
    agrupament_id: string;
    demarcacio_id: string|null;
    email:string;
    adreça: string;
    ultim_update:Timestamp;
    updated_at:Timestamp;
    nom:string;
    num_cens:string;
}

export interface Agrupament{
    agrupament_id: string;
    demarcacio_id: string|null;
    demarcacio: Agrupament|null;
    email:string;
    adreça: string;
    ultim_update:Timestamp;
    updated_at:Timestamp;
    nom:string;
    num_cens:string;
    lon:number|null;
    lat:number|null;
}