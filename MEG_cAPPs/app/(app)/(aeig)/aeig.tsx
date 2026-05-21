import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import ActionContainer from "@/components/aeig/accions-botons";
import { ThemedText } from "@/components/themed-text";
import * as MODEL from "@/constants/model";
import {
    BANNER_HEIGHT,
    FOOTER_HEIGHT,
    LIGHT,
    LILA,
    LILA_FOSC,
    MAP_LABELS,
    PADDING,
} from "@/constants/styles";
import { Colors } from "@/constants/theme";
import * as Utils from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
const __TOP = 0.8; // percentage of screen height for top section (category pages)

// TODO: pensar botons d'accions per cada rol (funcions d'EA i caps de branca) i enllaçar caps de branca amb la unitat.
const SCREEN_WIDTH = Dimensions.get("window").width - 2 * PADDING;
const SCREEN_HEIGHT =
  Dimensions.get("window").height - BANNER_HEIGHT - FOOTER_HEIGHT;

export default function AgrupamentDetailsScreen() {
  const scrollRef = useRef<FlatList<any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [funcions, setFuncions] = useState<MODEL.Funcio[]>([]);
  const [AEiGs, setAEiGs] = useState<MODEL.Agrupament[]>([]);
  const [user, setUser] = useState<MODEL.User | null>(null);
  const { agrupament_id } = useLocalSearchParams<{ agrupament_id?: string }>();

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

        const FUNCIONS = (await Utils.getFuncions()) as MODEL.Funcio[];
        setFuncions(FUNCIONS.filter((f) => Utils.funcioActiva(f))
                            .filter((f) => f.agrupament_id === agrupament_id));
      } catch (e) {
        console.log(e);
        if (e instanceof Error) setError(e.message);
        else setError("S'ha produït un error desconegut.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  /* ---------------- GROUP BY CATEGORY ---------------- */
  const pages = [
    { title: "Equip d'Agrupament", key: "equip_agrupament", selectable: true },
    { title: "Cap de Branca", key: "cap_grups", selectable: true },
    { title: "Intendència", key: "intendencia", selectable: true },
  ]
    .map((cat) => ({
      ...cat,
      data: funcions.filter(
        (f) => f.rol === cat.key || f.grup?.endsWith(cat.key),
      ),
    }))
    .filter((p) => p.data?.length > 0);

  /* ---------------- PAGE CHANGE ---------------- */
  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setPageIndex(index);
    setSelected(null); // reset selection when changing category
  };

  const scrollToPage = (index: number) => {
    if (!scrollRef.current || index < 0 || index >= pages.length) return;
    scrollRef.current.scrollToIndex({ index, animated: true });
    setPageIndex(index);
    setSelected(null);
  };

  const canScrollLeft = pageIndex > 0;
  const canScrollRight = pageIndex < pages.length - 1;

  /* ---------------- RENDER ---------------- */
  if (error) return <ErrorScreen message={error} />;
  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      {/* ========= TOP 3/4 ========= */}
      <View style={styles.top}>
        <View style={styles.titleRow}>
          <View style={styles.chevronSlot}>
            {canScrollLeft ? (
              <TouchableOpacity
                onPress={() => scrollToPage(pageIndex - 1)}
                style={styles.chevronButton}
              >
                <Ionicons
                  name="chevron-back"
                  color={Colors.dark.icon}
                  size={24}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.chevronPlaceholder} />
            )}
          </View>

          <ThemedText type="title" style={styles.titleCentered}>
            Funcions actives
          </ThemedText>

          <View style={styles.chevronSlot}>
            {canScrollRight ? (
              <TouchableOpacity
                onPress={() => scrollToPage(pageIndex + 1)}
                style={styles.chevronButton}
              >
                <Ionicons
                  name="chevron-forward"
                  color={Colors.dark.icon}
                  size={24}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.chevronPlaceholder} />
            )}
          </View>
        </View>
        <FlatList
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={pages}
          keyExtractor={(item) => item.key}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) =>
            item && (
              <FuncionsPerNivell
                page={item}
                selected={selected}
                onSelect={setSelected}
              />
            )
          }
        />
      </View>
      {/* ========= BOTTOM 1/4 ========= */}
      <ActionContainer page={pages[pageIndex]} selected={selected} />
    </View>
  );
}

/*  Funcions per nivell  */
function FuncionsPerNivell({
  page,
  selected,
  onSelect,
}: {
  page: any;
  selected: MODEL.Funcio | null;
  onSelect: any;
}) {
  if (!page.data.length) {
    return (
      <View style={[styles.page, styles.center]}>
        <Text>No s'han trobat funcions per aquest nivell</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      {/* this sets the paging width */}
      <View style={styles.pageInner}>
        {/* this adds padding/margin without breaking paging */}
        <Text style={styles.title}>{page.title}</Text>
        <View style={styles.cardsContainer}>
          {page.data.map((item: any) => (
            <FunctionCard
              key={item.funcio_id}
              item={item}
              selectable={page.selectable}
              selected={selected?.funcio_id === item.funcio_id}
              onPress={() =>
                page.selectable &&
                onSelect(selected?.funcio_id === item.funcio_id ? null : item)
              }
            />
          ))}
        </View>
      </View>
    </View>
  );
}

/* Tarjeta de Funció */
function FunctionCard({
  item,
  selectable,
  selected,
  onPress,
}: {
  item: MODEL.Funcio;
  selectable: boolean;
  selected: boolean;
  onPress: () => void;
}) {
  const rolLabel = String(MAP_LABELS[item.rol ?? ""] ?? "");
  const grupLabel = String(MAP_LABELS[item.grup ?? ""] ?? "");
  const dataText = String(
    item.data_inici ? Utils.formatDate(item.data_inici ?? new Date()) : "",
  );
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
      {rolLabel.length > 0 && (
        <Text style={[styles.role, styles.cardText]}>{rolLabel}</Text>
      )}
      {grupLabel.length > 0 && <Text style={styles.cardText}>{grupLabel}</Text>}
      {dataText.length > 0 && (
        <Text style={styles.cardText}>{`Des de ${dataText}`}</Text>
      )}
    </TouchableOpacity>
  );
}

/* ================= STYLES ================================= */
const styles = StyleSheet.create({
  container: { flex: 1 },

  top: {
    height: SCREEN_HEIGHT * __TOP,
    justifyContent: "center",
    alignItems: "center",
  },

  page: { width: SCREEN_WIDTH, justifyContent: "center", alignItems: "center" },
  pageInner: { paddingHorizontal: PADDING, width: "100%" },

  cardsContainer: { width: "100%", gap: 12 },
  card: {
    borderWidth: 2,
    backgroundColor: "#111",
    borderColor: "#444",
    padding: 18,
    borderRadius: 12,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: LILA,
    backgroundColor: LILA_FOSC,
  },
  disabledCard: { opacity: 0.5 },
  cardText: { color: LIGHT },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },

  titleRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  chevronSlot: {
    width: 40,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  chevronPlaceholder: {
    width: 24,
    height: 32,
  },
  chevronButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  titleCentered: {
    flex: 1,
    textAlign: "center",
    marginBottom: 0,
    lineHeight: 32,
  },
  role: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  actionBtn: {
    //backgroundColor: LILA,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
