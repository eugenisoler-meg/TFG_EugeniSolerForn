import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";

interface Permisos{
    secre: boolean,
    tresu: boolean,
    rp: boolean,
    cons: boolean
    cap_agrupament: boolean,
};


export default function FuncionsEA({ permisos }: { permisos: Permisos }){
    return <View style={styles.bottomHalf}>
        <View style={styles.row}>
          <ActionCard title="Secretaria" enabled={permisos.secre} />
          <ActionCard title="Tresoreria" enabled={permisos.tresu} />
          <ActionCard title="Resp. de Pedagogia" enabled={permisos.rp} />
          <ActionCard title="Consiliari" enabled={permisos.secre} />
        </View>

        <View style={styles.row}>
          <ActionCard title="Cap d'Agrupament" enabled={permisos.cap_agrupament} big />
        </View>
      </View>
}

function ActionCard({ title, enabled, big, }: 
  { title: string; enabled: boolean; big?: boolean; }) {
  return (
    <TouchableOpacity
      disabled={!enabled}
      style={[
        styles.actionCard,
        big && { flex: 1 },
        !enabled && styles.disabled,
      ]}
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