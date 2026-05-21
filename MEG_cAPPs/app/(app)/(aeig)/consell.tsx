import ErrorScreen from "@/app/error";
import LoadingScreen from "@/app/loading";
import { ThemedText } from "@/components/themed-text";
import { Collapsible } from "@/components/ui/collapsible";
import { getFuncionsByAgrupamentID } from "@/constants/database";
import * as MODEL from "@/constants/model";
import { BRANCA_COLORS, DARK, LIGHT, LIGHT_GRAY, MAP_LABELS } from "@/constants/styles";
import { getUser } from "@/constants/utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

type FuncioWithRelations = MODEL.Funcio & {
  afiliat?: MODEL.Afiliat;
  unitat?: MODEL.Unitat;
  agrupament?: MODEL.Agrupament;
};

export default function ConsellScreen() {
  const [funcions, setFuncions] = useState<FuncioWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { agrupament_id } = useLocalSearchParams<{ agrupament_id?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!agrupament_id) throw new Error("No s'ha especificat l'agrupament");

        const user = await getUser();
        if (!user) throw new Error("No s'ha iniciat sessió");
        const response = await getFuncionsByAgrupamentID(
          user.afiliat_id,
          agrupament_id,
        );
        // 1. extract string
        const raw = response;
        // 2. parse JSON string → array
        const funcions =
          typeof raw === "string" ? JSON.parse(raw) : (raw ?? []);

        setFuncions(funcions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconegut");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [agrupament_id]);

  // Group funcions by branca (excluding equip agrupament)
  const funcionsByBranca = funcions
    .filter((f) => !f.grup?.endsWith("_equip_agrupament"))
    .reduce(
      (acc, funcio) => {
        const branca = funcio.unitat?.branca || "unknown";
        if (!acc[branca]) acc[branca] = [];
        acc[branca].push(funcio);
        return acc;
      },
      {} as Record<string, FuncioWithRelations[]>,
    );

  const renderTable = (data: FuncioWithRelations[]) => {
    const showUnitat = data.some((item) => Boolean(item.unitat?.nom));

    return (
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.rowItem, styles.header]}>
            <Text style={[styles.cell, styles.headerText]}>Data Inici</Text>
            <Text style={[styles.cell, styles.headerText]}>Nom complet</Text>
            {showUnitat && (
              <Text style={[styles.cell, styles.headerText]}>Unitat</Text>
            )}
            {!showUnitat && (
              <Text style={[styles.cell, styles.headerText]}>Càrrec</Text>
            )}
          </View>
          {/* Data rows */}
          {data
            .sort(
              (a, b) =>
                a.rol.localeCompare(b.rol) ||
                a.unitat?.nom.localeCompare(b.unitat?.nom || "") ||
                a.afiliat?.cognoms.localeCompare(b.afiliat?.cognoms || "") ||
                0,
            )
            .map((item) => {
              const fullName = [item.afiliat?.nom, item.afiliat?.cognoms]
                .filter(Boolean)
                .join(" ");
              const startDate = item.data_inici
                ? new Date(item.data_inici).toLocaleDateString("ca-ES")
                : "";

              return (
                <View key={item.funcio_id} style={styles.rowItem}>
                  <Text style={styles.cell}>{startDate}</Text>
                  <Text style={styles.cell}>{fullName}</Text>
                  {item.unitat?.nom && (
                    <Text style={styles.cell}>{item.unitat.nom}</Text>
                  )}
                  {!item.unitat?.nom && (
                    <Text style={styles.cell}>
                      {MAP_LABELS[item.rol] || item.rol}
                    </Text>
                  )}
                </View>
              );
            })}
        </View>
      </View>
    );
  };

  // Define the order for branca sections
  const brancaOrder = [
    "castors_lludrigues",
    "llops_daines",
    "rangers_noies_guia",
    "pioners_caraveles",
    "trucs",
  ];

  // Sort branca entries according to the specified order
  const sortedBrancaEntries = Object.entries(funcionsByBranca)
    .filter(([branca]) => branca !== "unknown") // Exclude unknown branques
    .sort(([a], [b]) => {
      const indexA = brancaOrder.indexOf(a);
      const indexB = brancaOrder.indexOf(b);
      // If both are in the order array, sort by their position
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      // If only one is in the order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      // If neither is in the order array, maintain original order
      return 0;
    });

  // Get equip agrupament functions (these are not tied to a specific branca)
  const equipAgrupamentFunctions = funcions.filter((f) =>
    f.grup?.endsWith("_equip_agrupament"),
  );
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Consell d'Agrupament
      </ThemedText>

      {sortedBrancaEntries.map(([branca, brancaFuncions]) => {
        // Filter cap_grups roles for this branca
        const capGrups = brancaFuncions.filter((f) => f.rol === "cap_grups");
        const headerColor = BRANCA_COLORS[branca] || "#444";

        return (
          <Collapsible
            key={branca}
            title={MAP_LABELS[branca] || branca}
            headerColor={headerColor}
          >
            <View style={styles.brancaContent}>
              {capGrups.length > 0 && renderTable(capGrups)}
              {capGrups.length === 0 && (
                <ThemedText style={styles.emptyText}>
                  No hi ha caps de grup per aquesta branca
                </ThemedText>
              )}
            </View>
          </Collapsible>
        );
      })}

      {/* Equip d'Agrupament section */}
      {equipAgrupamentFunctions.length > 0 && (
        <Collapsible key="equip_agrupament" title="Equip d'Agrupament">
          <View style={styles.brancaContent}>
            {renderTable(equipAgrupamentFunctions)}
          </View>
        </Collapsible>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  brancaContent: {
    marginTop: 12,
  },
  tableContainer: {
    marginBottom: 24,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    shadowColor: DARK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  table: {
    borderWidth: 1,
    borderColor: "#e1e8ed",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: LIGHT,
  },
  rowItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  header: {
    backgroundColor: "#dbeeff",
    borderBottomWidth: 2,
    borderBottomColor: "#aac6e8",
  },
  headerText: {
    fontWeight: "bold",
    color: "#1f3f74",
    fontSize: 14,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: DARK,
    textAlign: "left",
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#6c757d",
    padding: 16,
  },
});
