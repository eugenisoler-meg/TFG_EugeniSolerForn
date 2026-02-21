import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import * as MODEL from "@/constants/model";
import * as STYLES from "@/constants/styles";
import { ThemedText } from "../themed-text";
import {router} from 'expo-router';
import { generateCertificate } from "@/constants/utils";

export default function ActionContainer({ page, selected }: { page: any, selected: MODEL.Funcio|null }) {
  let Action = null;
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

      {  page?.selectable && selected && Action}
      { !page?.selectable && <ThemedText type="link">No hi ha accions disponibles per a aquesta funció</ThemedText> }
    </View>
  );
}

export function ActionButton({onPress, title, style}: { onPress: () => void, title: string , style?: any}) {
  const buttonStyle = Array.isArray(style) ? Object.assign({}, ...style) : style || {};
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={buttonStyle.actionBtnText ?? styles.actionBtnText}>{title ?? ""}</Text>
    </TouchableOpacity>
  );
}

export function ActionButtonCapBranca({funcio}: { funcio: MODEL.Funcio}) {
  if(!funcio.unitat_id || funcio.unitat_id === '') return <Text style={{ color: "#666" }}>Selecciona una funció per veure les accions</Text>;
  return (<ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true}>
          <ActionButton onPress={() => router.push({ pathname: "/(app)/(aeig)/(unitat)/unitat", params: { unitat_id: funcio.unitat_id??'' , funcio: JSON.stringify(funcio) }})} 
            title={funcio.unitat_id ? "La meva unitat" : "Funció sense unitat al CRM"}
            style={[styles.actionBtn,
              {backgroundColor: STYLES.BRANCA_COLORS[funcio.grup?.replace("cap_grups", "infant")??'']??'#4f46e5' }
            ]}/>
          <ActionButton onPress={() => router.push({ pathname: "/(app)/(aeig)/(unitat)/sortides", params: { unitat_id: funcio.unitat_id }})} 
            title={funcio.unitat_id ? "Sortides d'unitat" : "Funció sense unitat al CRM"}
            style={[styles.actionBtn,
              {backgroundColor: STYLES.BRANCA_COLORS[funcio.grup?.replace("cap_grups", "infant")??'']??'#4f46e5' }
            ]}/>
          <ActionButton onPress={() => router.push({ pathname: "/(app)/(aeig)/(unitat)/llistes", params: { unitat_id: funcio.unitat_id??'' , funcio: JSON.stringify(funcio) }})} 
            title={funcio.unitat_id ? "Passa llista" : "Funció sense unitat al CRM"}
            style={[styles.actionBtn,
              {backgroundColor: STYLES.BRANCA_COLORS[funcio.grup?.replace("cap_grups", "infant")??'']??'#4f46e5' }
            ]}/>
      </ScrollView>);
};

export function ActionButtonCapAgrupament({funcio}: { funcio: MODEL.Funcio}) {
  if (funcio.agrupament_id === null || !funcio.agrupament_id) {
    return (<ActionButton onPress={() => {}} 
        title={"Funció sense agrupament al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>
          );
  }
  return (<ActionButton onPress={async () => await generateCertificate("equip_agrupament", funcio.afiliat_id, {funcio_id: funcio.funcio_id, agrupament_id: funcio.agrupament_id})} 
            title={funcio.grup?.endsWith("equip_agrupament") ? "Certificat EA" : "Funció sense grup al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>
          );
};

export function ActionButtonSecretaria({funcio}: { funcio: MODEL.Funcio}) {
  return (
  <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true}>
    <ActionButtonCapAgrupament funcio={funcio} />
    <ActionButton onPress={() => router.push({ pathname: "/(app)/(aeig)/(ea)/consells", params: { agrupament_id: funcio.agrupament_id??'' }})} 
            title={funcio.grup === "secretaria_equip_agrupament" ? "Gestiona consells" : "Funció sense grup al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>
  </ScrollView>
  );
};

export function ActionButtonTresoreria({funcio}: { funcio: MODEL.Funcio}) {
  return (<ActionButton onPress={() => {}} 
            title={funcio.grup?.endsWith("equip_agrupament") ? "Funcionalitat no desenvolupada" : "Funció sense grup al CRM"}
            style={[styles.actionBtn, {backgroundColor:'#4f46e5' } ]}/>
          );
};

const styles = StyleSheet.create({
  actions: { height: '100%', borderTopWidth: 1, borderColor: "#ddd", 
    justifyContent: "center", alignItems: "center", gap: 10, flex:1, flexDirection: 'row',
    paddingHorizontal: 15,
},
  scrollContainer: {
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 10,
    flexDirection: "row",
    height: '100%',
  },
  container: {
    flex: 1,
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,        // use minHeight instead of fixed height
    width: 150,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    boxShadow: `0 4px 0 rgba(35, 35, 35, 0.8)`,
    elevation: 3,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    flexWrap: "wrap",      // allows text to wrap
    lineHeight: 20,        // optional, controls spacing between lines
  },

});