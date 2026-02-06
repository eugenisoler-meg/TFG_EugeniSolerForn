import { useState, useEffect } from "react";
import {router, useLocalSearchParams} from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, } from "react-native";
import * as MODEL from '@/constants/model';
import * as Utils from '@/constants/utils';
import * as STYLES from '@/constants/styles';
import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";

// TODO: pensar botons d'accions per cada rol (funcions d'EA i caps de branca) i enllaçar caps de branca amb la unitat.

const { width, height } = Dimensions.get("window");

export default function AgrupamentDetailsScreen() {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [funcions, setFuncions] = useState<MODEL.Funcio[]>([]);
  const [AEiGs, setAEiGs] = useState<MODEL.Agrupament[]>([]);  
  const [user, setUser] = useState<MODEL.User | null>(null);
  const { agrupament_id } = useLocalSearchParams<{agrupament_id?:string}>();
  
  /* ---------------- STATE ---------------- */
  const [selected, setSelected] = useState<MODEL.Funcio | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
          const fetchUserData = async () => {
          setError(null);
          try {
              const user = await Utils.getUser();
              if (!user) {
                  setError("La sessió no s'ha iniciat correctament.");
                  router.replace("../login");
                  return;
              }
              setUser(user as MODEL.User);
  
              const FUNCIONS = await Utils.getFuncions() as MODEL.Funcio[];
              setFuncions(FUNCIONS.filter((f) => Utils.funcioActiva(f)));
            } catch (e) {
              console.log(e);
              if (e instanceof Error)
                  setError(e.message);
              else setError("S'ha produït un error desconegut.");
      
          } finally { setLoading(false); }
          };
  
          fetchUserData();
      }, []);

  /* ---------------- GROUP BY CATEGORY ---------------- */
  const pages = [
        { title: "Equip d'Agrupament", key: "equip_agrupament", selectable: true },
        { title: "Cap de Branca", key: "cap_grups", selectable: true },
        { title: "Intendència", key: "intendencia", selectable: true },
    ].map((cat) => ({
      ...cat,
      data: funcions.filter(f => (f.rol === cat.key || f.grup?.endsWith(cat.key))),
    })).filter((p) => p.data?.length > 0);

  /* ---------------- PAGE CHANGE ---------------- */
  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setPageIndex(index);
    setSelected(null); // reset selection when changing category
  };

  /* ---------------- RENDER ---------------- */
  if(error) return ErrorScreen(error);
  if(loading) return LoadingScreen();
  return (
    <View style={styles.container}>

      {/* ========= TOP 3/4 ========= */}
      <View style={styles.top}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={pages}
          keyExtractor={(item) => item.key}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) => (
            <CategoryPage
              page={item}
              selected={selected}
              onSelect={setSelected}
            />
          )}
        />
      </View>

      {/* ========= BOTTOM 1/4 ========= */}
      <ActionBar
        page={pages[pageIndex]}
        selected={selected}
      />

    </View>
  );
}


/* ========================================================= */
/* ================= CATEGORY PAGE ========================== */
/* ========================================================= */

function CategoryPage({ page, selected, onSelect }: any) {
  if (!page.data.length) {
    return (
      <View style={[styles.page, styles.center]}>
        <Text>No funcions found</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{page.title}</Text>

      <View style={styles.cardsContainer}>
        {page.data.map((item: any) => (
          <FunctionCard
            key={item.funcio_id}
            item={item}
            selectable={page.selectable}
            selected={selected?.funcio_id === item.funcio_id}
            onPress={() => page.selectable && onSelect(item)}
          />
        ))}
      </View>
    </View>
  );
}


/* ========================================================= */
/* ================= FUNCTION CARD ========================== */
/* ========================================================= */

function FunctionCard({ item, selectable, selected, onPress }: any) {
  return (
    <TouchableOpacity
      disabled={!selectable}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selectedCard,
        !selectable && styles.disabledCard,
      ]}
    >
      <Text style={styles.role}>{STYLES.MAP_LABELS[item.rol]}</Text>
      <Text>{STYLES.MAP_LABELS[item.grup]}</Text>
      <Text>Des de {Utils.formatDate(item.data_inici)}</Text>
    </TouchableOpacity>
  );
}

// TODO: moure a components
/* ========================================================= */
/* ================= ACTION BAR ============================= */
/* ========================================================= */

function ActionBar({ page, selected }: any) {
  return (
    <View style={styles.actions}>
      {page?.selectable && !selected && (
        <Text style={{ color: "#666" }}>Selecciona una funció per veure les funcionalitats</Text>
      )}

      {page?.selectable && selected && (
        <>
          <ActionButton title="Gestió" unitat_id={selected.unitat_id??null}/>
          <ActionButton title="Certificat" />
        </>
      )}

      {!page?.selectable && (
        <ActionButton title="Info general" />
      )}
    </View>
  );
}

function ActionButton({ title, unitat_id }: { title: string, unitat_id?: string }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={() => {
            console.log(unitat_id);
            unitat_id && router.push({ pathname: "/(app)/(aeig)/(unitat)/unitat", params: { unitat_id: unitat_id }}); }
        }>
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
}


/* ========================================================= */
/* ================= STYLES ================================= */
/* ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  top: {
    height: height * 0.80,
  },

  page: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },

  cardsContainer: {
    width: "85%",
    gap: 12,
  },

  card: {
    backgroundColor: "#eee",
    borderColor: '#222',
    padding: 18,
    borderRadius: 12,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "#dfefff",
  },

  disabledCard: {
    opacity: 0.5,
  },

  role: {
    fontWeight: "bold",
  },

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

  actionBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
