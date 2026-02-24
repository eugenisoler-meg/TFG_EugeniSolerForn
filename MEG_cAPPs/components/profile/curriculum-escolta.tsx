import * as MODEL from '@/constants/model'; // Replace with the correct path to your MODEL definition
import { Text,  View, FlatList, StyleSheet } from 'react-native';
import * as Utils from '@/constants/utils';
import * as STYLES from '@/constants/styles';

// TODO: botó per descarregar certificat d'anys de cap/infant

export default function CurriculumEscolta({ history }: { history: MODEL.Funcio[] }) {
return (
    <View style={styles.container}>
        { history.filter(f => f.rol === "infant") && 
          <FlatList
            data={history.filter(f => f.rol === "infant")}
            keyExtractor={(item) => item.funcio_id}
            style={styles.table}
            renderItem={({ item }) => (
            <View style={[styles.rowItem, item.rol === "infant" && { backgroundColor: STYLES.BRANCA_COLORS[item.grup??''] }]}>
                <Text style={styles.cell}>{STYLES.MAP_LABELS[item.rol]}</Text>
                <Text style={styles.cell}>{STYLES.MAP_LABELS[item.grup??'']}</Text>
                <Text style={styles.cell}>{Utils.parseDate(item.data_inici)}</Text>{/*{item.data_inici.toDateString()}</Text>*/}
                <Text style={styles.cell}>{item.data_fi?Utils.parseDate(item.data_fi):''}</Text>{/*{item.data_inici.toDateString()}</Text>*/}
            </View>
            )}
            ListHeaderComponent={() => (
            <View style={[styles.rowItem, styles.header]}>
                <Text style={styles.cell}>Funció</Text>
                <Text style={styles.cell}>Grup</Text>
                <Text style={styles.cell}>Data d'inici</Text>
                <Text style={styles.cell}>Data de fi</Text>
            </View>
            )}
          />
        }
        {history.filter(f => f.rol !== "infant") &&
          <FlatList
            data={history.filter(f => f.rol !== "infant")}
            keyExtractor={(item) => item.funcio_id}
            style={styles.table}
            renderItem={({ item }) => (
            <View style={[styles.rowItem, item.rol === "infant" && { backgroundColor: STYLES.BRANCA_COLORS[item.grup??''] }]}>
                <Text style={styles.cell}>{STYLES.MAP_LABELS[item.rol]}</Text>
                <Text style={styles.cell}>{STYLES.MAP_LABELS[item.grup??'']}</Text>
                <Text style={styles.cell}>{Utils.parseDate(item.data_inici)}</Text>{/*{item.data_inici.toDateString()}</Text>*/}
                <Text style={styles.cell}>{item.data_fi?Utils.parseDate(item.data_fi):''}</Text>{/*{item.data_inici.toDateString()}</Text>*/}
            </View>
            )}
            ListHeaderComponent={() => (
            <View style={[styles.rowItem, styles.header]}>
                <Text style={styles.cell}>Funció</Text>
                <Text style={styles.cell}>Grup</Text>
                <Text style={styles.cell}>Data d'inici</Text>
                <Text style={styles.cell}>Data de fi</Text>
            </View>
            )}
          />
        }
    </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    marginVertical: 5,
  },

  rowItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },

  header: {
    backgroundColor: "#f3f4f6",
  },

  cell: {
    textAlign: "center",
    flex: 1,
    fontSize: 12,
  },
  
});