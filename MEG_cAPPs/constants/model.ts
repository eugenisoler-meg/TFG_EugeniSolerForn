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
    email: string;
    tlf: string;
    data_naixement: Date;
    num_moni: null;
    num_dire: null;
    dni: string;
    tipus : 'cap_suport'| 'infant_jove' | 'familiar_tutor' |null;
}

export interface Funcio {
    funcio_id : string;
    afiliat_id: string;
    agrupament_id: string | null;
    nivell: 'agrupament' | 'demarcacio' | 'meg';
    rol: string;
    grup: string;
    unitat_id: string | null;
    data_inici: Date;
    data_fi: Date | null;
}