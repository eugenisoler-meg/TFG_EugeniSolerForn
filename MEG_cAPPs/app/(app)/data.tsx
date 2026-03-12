import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { useEffect, useState, useCallback } from "react";
import {  ScrollView, RefreshControl, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import DataCard from "@/components/data/DataCard";
import DataGrid from "@/components/data/DataGrid";
import LoadingScreen from "../loading";
import ErrorScreen from "../error";
import { fetchQuery, getUser } from "@/constants/utils";

type DataQuery = {
  totalInfants?: number;
  totalVoluntaris?: number;
  totalAgrupaments?: number;
  countGrups: [ {grup: string, total: number} ];
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
        console.log(dataQuery.countGrups);
    } catch (err) {
        if(err instanceof Error) setError(err.message);
        else setError("Error desconegut");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const infantsDataRaw = data ? data.countGrups.filter( item => item.grup.startsWith("intant_")) : [{grup: "NO DATA", total: 0}];
  const InfantsData = {
    labels: infantsDataRaw.map(item => item.grup),
    datasets: [{ data: infantsDataRaw.map(item => item.total) }]
  };
  // Animate bars on mount
  const [animatedInfantsData, setAnimatedData] = useState(
    infantsDataRaw.map(item => ({ ...item, total: 0 }))
  ); 
  useEffect(() => {
    setTimeout(() => {
      setAnimatedData(InfantsData);
    }, 300);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const InfantsComponent = <ThemedText type="subtitle">{data?.totalInfants || 'test'}</ThemedText>;
  const VoluntarisComponent = <ThemedText type="subtitle">{data?.totalVoluntaris || 'test'}</ThemedText>;
  
  console.log(InfantsData);
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
        <BarChart
          data={InfantsData}
          width={100}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" infants"
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0
          }}
          verticalLabelRotation={0}
        />        
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