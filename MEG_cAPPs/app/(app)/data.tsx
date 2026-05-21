import GraficBarres from "@/components/data/BarGraph";
import DataCard from "@/components/data/DataCard";
import DataGrid from "@/components/data/DataGrid";
import { ThemedText } from "@/components/themed-text";
import { BRANCA_COLORS, LIGHT, MAP_LABELS } from "@/constants/styles";
import { fetchQuery, getUser } from "@/constants/utils";
import { useCallback, useEffect, useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ErrorScreen from "../error";
import LoadingScreen from "../loading";

type DataQuery = {
  totalInfants?: number;
  totalVoluntaris?: number;
  totalAgrupaments?: number;
  totalCaps?: number;
  grupCounts?: { grup: string; total: number }[] | [];
  demarcacioCounts?: { demarcacio: string; total: number }[] | [];
};

export default function DataScreen() {
  const [data, setData] = useState<DataQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const user = await getUser();
      if (!user) throw new Error("No s'ha iniciat sessió");
      const afiliat_id = user.afiliat_id;
      const dataQuery = (await fetchQuery("data_vis", {
        afiliat_id,
      })) as DataQuery;
      setData(dataQuery);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconegut");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const InfantsTotals = data?.grupCounts
    ?.filter((count) => (count.grup ? count.grup.startsWith("infant_") : false))
    .map((item, i) => ({
      value: item.total,
      label: MAP_LABELS[item.grup],
      frontColor: BRANCA_COLORS[item.grup],
      topLabelComponent: () => (
        <Text style={{ color: "darkGray", fontSize: 12, marginBottom: 4 }}>
          {item.total}
        </Text>
      ),
    }));
  const DemarcacioTotals = data?.demarcacioCounts
    ?.filter((count) =>
      count.demarcacio ? count.demarcacio.startsWith("MEG") : false,
    )
    .filter((count) => !count.demarcacio.endsWith("Barcelonès"))
    .sort((a, b) => b.demarcacio.localeCompare(a.demarcacio))
    .map((item, i) => ({
      value: item.total,
      label: item.demarcacio
        .replace("MEG - ", "")
        .replace("Barcelonès-Àrea", "Bcnès"),
      frontColor: "blue",
      topLabelComponent: () => (
        <Text style={{ color: "darkGray", fontSize: 12, marginBottom: 4 }}>
          {item.total}
        </Text>
      ),
    }));
  const CapsTotals = data?.grupCounts
    ?.filter((count) =>
      count.grup ? count.grup.startsWith("cap_grups_") : false,
    )
    .map((item, i) => ({
      value: item.total,
      label: MAP_LABELS[item.grup],
      frontColor: BRANCA_COLORS[item.grup],
      topLabelComponent: () => (
        <Text style={{ color: "darkGray", fontSize: 12, marginBottom: 4 }}>
          {item.total}
        </Text>
      ),
    }));
  const InfantsComponent = (
    <View style={{ width: "100%" }}>
      <ThemedText type="subtitle" style={{ textAlign: "center" }}>
        {data?.totalInfants || "test"}
      </ThemedText>
      <GraficBarres
        DATA={[
          ...(InfantsTotals ?? [
            { label: "NO DATA", value: 0, frontColor: LIGHT },
          ]),
        ]}
      />
    </View>
  );
  const CapsComponent = (
    <View style={{ width: "100%" }}>
      <ThemedText type="subtitle" style={{ textAlign: "center" }}>
        {data?.totalCaps || "test"}
      </ThemedText>
      <GraficBarres
        DATA={[
          ...(CapsTotals ?? [
            { label: "NO DATA", value: 0, frontColor: LIGHT },
          ]),
        ]}
      />
    </View>
  );
  const AgrupamentsComponent = (
    <ThemedText type="subtitle" style={{ textAlign: "center" }}>
      {data?.totalAgrupaments || "test"}
    </ThemedText>
  );
  const DemarcacionsComponent = (
    <View style={{ width: "100%" }}>
      <GraficBarres
        DATA={[
          ...(DemarcacioTotals ?? [
            { label: "NO DATA", value: 0, frontColor: LIGHT },
          ]),
        ]}
      />
    </View>
  );

  if (loading) return <LoadingScreen />;
  else if (error) return <ErrorScreen message={error} />;
  else
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedText type="title">MEG ja som...</ThemedText>
        <DataGrid>
          <DataCard icon="person" title="Infants" content={InfantsComponent} />
          <DataCard icon="person" title="Caps" content={CapsComponent} />
          <DataCard
            icon="home"
            title="Agrupaments"
            content={AgrupamentsComponent}
          />
          <DataCard
            icon="map"
            title="Per Demarcacions"
            content={DemarcacionsComponent}
          />
        </DataGrid>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
