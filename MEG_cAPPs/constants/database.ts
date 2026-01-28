

export const getPermisosNivell = async (afiliat_id: string) => {
	return fetch("https://testapi.escoltesiguies.cat/fetch?q=permisos_nivell&afiliat_id=" + encodeURI(afiliat_id));
};