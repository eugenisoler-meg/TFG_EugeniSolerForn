import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

// TODO: fer la info d'agrupament més bonica

export interface AgrupamentDetails{
    agrupament_id: string;
    demarcacio_id: string|null;
    demarcacio: AgrupamentDetails|null;
    email:string;
    adreça: string;
    ultim_update:Timestamp;
    updated_at:Timestamp;
    nom:string;
    num_cens:string;
    lon:number|null;
    lat:number|null;
}

interface Props {
  agrupament: AgrupamentDetails;
  onPress: () => void;
}
// TODO: importar lat/lon al CRM i afegir-ho al model i SQL
export default function AgrupamentCard({ agrupament, onPress }: Props) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const openMaps = () => {
    if (!agrupament.lat || !agrupament.lon) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${agrupament.lat},${agrupament.lon}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.row}>

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.title}>{agrupament.nom}</Text>
          {expanded && (
            <>
              <Text style={styles.subtitle}>{agrupament.email}</Text>
              <Text style={styles.address}>{agrupament.adreça}</Text>
            </>
          )}
        </View>

        {/* MAP */}
        <TouchableOpacity style={styles.mapCard} onPress={openMaps}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 41.458,
              longitude: 2.065,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            pointerEvents="none"
          />
        </TouchableOpacity>

        {/* ARROW */}
        <TouchableOpacity style={styles.arrow} onPress={onPress}>
          <Ionicons name="chevron-forward" size={26} />
        </TouchableOpacity>
      </View>

      {/* SHOW MORE */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.showMore}
          onPress={() => setExpanded((v) => !v)}
        >
          <Text style={styles.showMoreText}>
            {expanded ? 'Amaga detalls' : 'Mostra detalls'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showMore}
          onPress={() => router.push('/(app)/(aeig)/consell')}
        >
          <Text style={styles.showMoreText}>
            Consell
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    boxShadow: `0 6px 0 rgba(35, 35, 35, 0.8)`,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },

  info: {
    flex: 1,
    paddingHorizontal: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  address: {
    fontSize: 12,
    marginTop: 6,
    color: '#444',
  },

  mapCard: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    height: '100%',
    minHeight: 100,
    justifyContent: 'space-around',
  },
  map:{ height: '100%', width: '100%', pointerEvents:'none' },

  mapText: {
    fontSize: 11,
  },

  arrow: {
    width: 30,
    alignItems: 'flex-end',
  },

  showMore: {
    flex: 1,
    alignItems: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  showMoreText: {
    fontSize: 12,
    color: '#3b82f6',
  },
});
