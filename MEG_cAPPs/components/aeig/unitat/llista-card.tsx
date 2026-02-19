import React from 'react';
import { Alert, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Llista, TipusLlista, TipusLlistaKeys } from '@/constants/model';
import { ThemedText } from '@/components/themed-text';
import Feather from '@expo/vector-icons/Feather';
import {router} from "expo-router";

const TipusIcon = {
  cau: 'users',        // example FontAwesome5 icon name
  sortida: 'map-marker-alt',
  campament: 'campground'
};
export const filterByTipus = (llistes: Llista[], tipus: TipusLlistaKeys) =>
  llistes
    .filter(l => l.tipus === tipus)
    .sort((a, b) => new Date(b.data_llista).getTime() - new Date(a.data_llista).getTime());
const isToday = (date: Date, today: Date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

export const filterByDate = (llistes: Llista[], date: Date) => llistes.filter(l => isToday(new Date(l.data_llista), date));
export const filterByToday = (llistes: Llista[], today: Date) => filterByDate(llistes, today).sort((a, b) => new Date(b.data_llista).getTime() - new Date(a.data_llista).getTime());

interface CardProps { llista: Llista; onValidate: (llista_id: string) => void; };
const LlistaCard: React.FC<CardProps> = ({ llista, onValidate }) => {
  const total = llista.assistencies_cau?.length ?? 0;
  const validated = llista.assistencies_cau?.filter(a => a.validada === "Assistència").length ?? 0;
  const percentage = total ? Math.round((validated / total) * 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <FontAwesome5
          name={TipusIcon[llista.tipus]}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.name}>{llista.tipus.toLocaleUpperCase()} del dia {new Date(llista.data_llista).toLocaleDateString()}</Text>
        <TouchableOpacity style={[styles.button, {flexDirection: 'row', alignItems: 'center'}]}
          onPress={() => onValidate(llista.llista_id)} >
          <Text style={styles.buttonText}>Passa llista</Text>
          <Feather style={{marginHorizontal: 4}} name="check-square" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={{ width: 32 }} />
        <Text style={styles.percentage}>{`${validated} / ${total} (${percentage}%)`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  icon: { marginHorizontal: 5 },
  name: { flex: 1, fontSize: 16, fontWeight: '500' },
  button: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#007bff', borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '500' },
  percentage: { fontSize: 14, color: '#555', marginLeft: 8 },
  section: { minHeight: '25%', borderBottomWidth: 1, borderColor: '#ddd' },
  sectionTitle: { fontSize: 18, fontWeight: '600', padding: 8, backgroundColor: '#f0f0f0' }
});

export default function LlistaList({ llistes, section }: { llistes: Llista[], section?: keyof typeof TipusLlista }) {
  const handleValidate = (llista: Llista) => {
    router.push({ pathname:"/(app)/(aeig)/(unitat)/llista-detail", params: {assistencies_cau: JSON.stringify(llista.assistencies_cau)}});
  };

  return (
    <View style={[styles.section]}>
        <FlatList
            data={llistes}
            keyExtractor={item => item.llista_id}
            renderItem={({ item }) => <LlistaCard llista={item} onValidate={() => handleValidate(item)} />}
        />
    </View>
  );
};
