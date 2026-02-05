import {View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function FuncionsUnitat({funcions} : {funcions:FuncioUnitat[]}){
    funcions = funcions.sort((a,b) => {return new Date(a.afiliat.data_naixement).getTime() - new Date(b.afiliat.data_naixement).getTime()}) 
    const infants = funcions.filter((f)=> f.rol === "infant");
    const caps = funcions.filter((f)=> f.rol === "cap_grups");
    return <View style={styles.container}>
            <ThemedText type='subtitle'>Equip de caps ({caps.length})</ThemedText>
            <FlatList style={ {marginBottom: 15, paddingHorizontal:10} }
            data={caps}
            keyExtractor={(item) => item.funcio_id}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <View>
                        <Text style={styles.name}> {item.afiliat.nom} {item.afiliat.cognoms}</Text>
                        <Text style={styles.dni}> {item.afiliat.dni??''}</Text>
                    </View>
                    {item.afiliat.num_dire && <Text style={styles.dire}> D: {item.afiliat.num_dire} </Text> }
                    {!item.afiliat.num_dire && item.afiliat.num_moni && <Text style={styles.moni}> M: {item.afiliat.num_moni} </Text> }
                    
                </View>
            )}
            />
            <ThemedText type="subtitle">Infants ({infants.length})</ThemedText>
            <FlatList style={ {marginBottom: 15, paddingHorizontal:10} }
            data={infants}
            keyExtractor={(item) => item.funcio_id}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => { router.push({ pathname: "/(app)/(aeig)/(unitat)/infant", params: { infant_id: item.afiliat_id }}); }}>
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {item.afiliat.nom} {item.afiliat.cognoms} 
                        </Text>

                        <FontAwesome5 name="arrow-alt-circle-right" size={20} color="black" />
                    </View>
                </TouchableOpacity>
            )}
            />
        </View>;
}

export interface FuncioUnitat {
    funcio_id: string;
    nivell: string;
    rol: string;
    grup: string;
    data_inici: Date;
    data_fi : Date|null;

    unitat_id: string;
    unitat: {
        unitat_id:string;
        nom:string;
        branca:string;
    }
    
    agrupament_id: string;
    agrupament: {
        agrupament_id: string;
        nom:string;
    }
    
    afiliat_id:string;
    afiliat : {
        afiliat_id:string;
        nom:string;
        cognoms:string;
        data_naixement:Date;
        dni:string|null;
        num_moni: string| null;
        num_dire:string|null;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop:20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: .8,
        borderTopWidth: .8,
        borderColor: "#eee",
    },
    name: {
        fontWeight: "600",
        fontSize: 16,
    },
    dni: {
        fontWeight: "300",
        fontSize: 14,
    },
    moni: {
        color: "#77DD77",
    },
    dire: {
        color: "#FDFD96",
    },
});