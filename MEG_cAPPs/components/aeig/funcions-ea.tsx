import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { generateCertificate } from "@/constants/utils";
interface Permisos{
    secre: boolean,
    tresu: boolean,
    rp: boolean,
    cons: boolean,
    cap_agrupament: boolean,
};
interface IDsEA{
    secre: string|null,
    tresu: string|null,
    rp: string|null,
    cons: string|null,
    cap_agrupament: string|null,
};

export default function FuncionsEA({ permisos, afiliat_id, ID_EA }: { permisos: Permisos, afiliat_id:string,  ID_EA : IDsEA}){
    return <View style={styles.bottomHalf}>
        <View style={styles.row}>
          <ActionCard title="Secretaria" enabled={permisos.secre} afiliat_id={afiliat_id} funcio_id={ID_EA.secre}/>
          <ActionCard title="Tresoreria" enabled={permisos.tresu} afiliat_id={afiliat_id} funcio_id={ID_EA.tresu}/>
          <ActionCard title="Resp. de Pedagogia" enabled={permisos.rp} afiliat_id={afiliat_id} funcio_id={ID_EA.rp}/>
          <ActionCard title="Consiliari" enabled={permisos.cons} afiliat_id={afiliat_id} funcio_id={ID_EA.cons}/>
        </View>

        <View style={styles.row}>
          <ActionCard title="Cap d'Agrupament" enabled={permisos.cap_agrupament} big afiliat_id={afiliat_id} funcio_id={ID_EA.cap_agrupament}/>
        </View>
      </View>
}

function ActionCard({ title, enabled, big, afiliat_id, funcio_id}: 
  { title: string, enabled: boolean, big?: boolean, afiliat_id?:string|null, funcio_id?:string|null}) {
  return (
    <TouchableOpacity
      disabled={!enabled}
      style={[
        styles.actionCard,
        big && { flex: 1 },
        !enabled && styles.disabled,
      ]}
      onPress={()=> { (funcio_id && afiliat_id) ? generateCertificate('funcio', afiliat_id, { funcio_id }) : null}}
    >
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // ---------- bottom cards ----------
  row: {
    flexDirection: "row",
    gap: 6,
  },

  actionCard: {
    flex: 1,
    height: 90,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    textAlign:'center',
    backgroundColor: "#f2f2f2",
  },

  actionText: {
    fontWeight: "600",
    fontSize: 14,
  },

  disabled: {
    opacity: 0.4,
  },
  bottomHalf: {
    flex: 1,
    padding: 12,
    justifyContent: "space-evenly",
  },
});