
export const parseDate = (d:Date) => d.toISOString().split('T')[0];

export const __LLEI:string[] = [
    "Ens esforcem a merèixer confiança i fem confiança a tothom.",
    "Vivim la nostra fe i respectem les conviccions dels altres.",
    "Aprenem a ser útils i a fer servei.",
    "Som germans de tothom i treballem per la pau.",
    "Som fidels al nostre país i ens sentim ciutadans del món.",
    "Defensem la natura i protegim la vida.",
    "Aprenem a viure en equip i tot ho fem entre tots.",
    "Som decidits i afrontem les dificultats sense por.",
    "Estimem el treball i volem fer bé les coses.",
    "Aprenem a estimar i a jugar net."
];

export const tryLogin = async (dni : string, data_naixement : Date) => 
    fetch(`https://testapi.escoltesiguies.cat/login?dni=${dni}&data_naixement=${parseDate(data_naixement)}`, 
    {method: "GET", headers: {"Content-Type": "application/json"},});