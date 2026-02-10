import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import * as MODEL from "@/constants/model";
import * as STYLES from "@/constants/styles";
import { ThemedText } from "../themed-text";
import {router} from 'expo-router';
const { width, height } = Dimensions.get("window");
export default function ActionContainer({ page, selected }: { page: any, selected: MODEL.Funcio|null }) {
  let Action = <></>;
  if(selected){
    switch(selected.rol){
        case "cap_grups": Action = <ActionButtonCapBranca funcio={selected} />; break;
        case "cap_agrupament": Action = <ActionButtonCapAgrupament funcio={selected} />; break;
        case "secretaria": Action = <ActionButtonSecretaria funcio={selected} />; break;  
        case "tresoreria": Action = <ActionButtonTresoreria funcio={selected} />; break;
    }
  }
  return (
    <View style={styles.actions}>
      {page?.selectable && !selected && (
        <Text style={{ color: "#666" }}>Selecciona una funció per veure les funcionalitats</Text>
      )}

      {page?.selectable && selected && Action}
      { !page?.selectable && <ThemedText type="link">No hi ha accions disponibles per a aquesta funció</ThemedText> }
    </View>
  );
}
export function ActionButton({onPress, title, style}: { onPress: () => void, title: string , style?: any}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
}

export function ActionButtonCapBranca({funcio}: { funcio: MODEL.Funcio}) {
  return <ActionButton onPress={() => router.push({ pathname: "/(app)/(aeig)/(unitat)/unitat", params: { unitat_id: funcio.unitat_id??'' , funcio: JSON.stringify(funcio) }})} 
            title={funcio.unitat_id ? "La meva unitat" : "Funció sense unitat al CRM"}
            style={[styles.actionBtn,
                {backgroundColor: STYLES.BRANCA_COLORS[funcio.grup?.replace("cap_grups", "infant")??'']??'#4f46e5' }
            ]}/>;
}

export function ActionButtonCapAgrupament({funcio}: { funcio: MODEL.Funcio}) {
  return <ActionButton onPress={() => {}} 
            title={funcio.grup?.endsWith("equip_agrupament") ? "Certificat d'Equip d'Agrupament" : "Funció sense grup al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>;
}

export function ActionButtonSecretaria({funcio}: { funcio: MODEL.Funcio}) {
  return <ActionButton onPress={() => {}} 
            title={funcio.grup?.endsWith("equip_agrupament") ? "Funcionalitat no desenvolupada" : "Funció sense grup al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>;
}

export function ActionButtonTresoreria({funcio}: { funcio: MODEL.Funcio}) {
  return <ActionButton onPress={() => {}} 
            title={funcio.grup?.endsWith("equip_agrupament") ? "Funcionalitat no desenvolupada" : "Funció sense grup al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>;
}

const styles = StyleSheet.create({
  actions: {
    height: height * 0.20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flex:1,
    flexDirection: 'row',
    paddingBottom: height*.05,
  },
  container: {
    flex: 1,
  },
  actionBtn: {
    //backgroundColor: "#4f46e5",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
});