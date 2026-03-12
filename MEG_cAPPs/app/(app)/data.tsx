import { useEffect, useState, useCallback,  } from "react";
import {  ScrollView, RefreshControl, StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/themed-text";
import DataCard from "@/components/data/DataCard";
import DataGrid from "@/components/data/DataGrid";
import InfantsBar from "@/components/data/BarGraph";
import LoadingScreen from "../loading";
import ErrorScreen from "../error";
import { fetchQuery, getUser } from "@/constants/utils";
import { BRANCA_COLORS, MAP_LABELS } from "@/constants/styles";

type DataQuery = {
  totalInfants?: number;
  totalVoluntaris?: number;
  totalAgrupaments?: number;
  grupCounts?: {grup: string; total: number}[] | [];
};

export default function DataScreen() {
  const [data, setData] = useState<DataQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
        const user = await getUser();
        if(!user) throw new Error("No s'ha iniciat sessió");
        const afiliat_id = user.afiliat_id;
        const dataQuery = await fetchQuery('data_vis', { afiliat_id }) as DataQuery;
        setData(dataQuery);
    } catch (err) {
        if(err instanceof Error) setError(err.message);
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
  const BranquesTotals = data?.grupCounts?.filter(count => count.grup.startsWith("infant_"))
    .map((item, i) => ({ value: item.total, label: MAP_LABELS[item.grup], frontColor: BRANCA_COLORS[item.grup],
                    topLabelComponent: () => (<Text style={{color: 'darkGray', fontSize: 12, marginBottom: 4}}>{item.total}</Text>)
    }));
  const InfantsComponent = <ThemedText type="subtitle">{data?.totalInfants || 'test'}</ThemedText>;
  const VoluntarisComponent = <ThemedText type="subtitle">{data?.totalVoluntaris || 'test'}</ThemedText>;
  
  if (loading) return LoadingScreen();
  else if (error) return ErrorScreen(error);
  else return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ThemedText type="title">MEG ja som...</ThemedText>

      <DataGrid>
        <DataCard icon='person' title="Infants" content={InfantsComponent}/>
        <InfantsBar DATA={[...(BranquesTotals ?? [{ label: "NO DATA", value: 0, frontColor: "black" }])]} />        
        <DataCard icon='person' title="Voluntaris" content={VoluntarisComponent}/>
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