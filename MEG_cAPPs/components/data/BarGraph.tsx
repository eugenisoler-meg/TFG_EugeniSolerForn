import { LIGHT } from "@/constants/styles";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

const BRANCA_ORDRE = {
  CiLL: 1,
  LLiD: 2,
  RiNG: 3,
  PiC: 4,
  Truc: 5,
  Suport: 6,
} as { [key: string]: number };
export default function GraficBarres({
  DATA,
}: {
  DATA: { value: number; label: string; frontColor: string }[];
}) {
  const max = DATA.sort((a, b) => b.value - a.value).map((e) => e.value)[0];
  DATA = DATA.sort((a, b) =>
    BRANCA_ORDRE[a.label] && BRANCA_ORDRE[b.label]
      ? BRANCA_ORDRE[a.label] - BRANCA_ORDRE[b.label]
      : a.label.localeCompare(b.label),
  );
  return (
    <BarChart
      data={DATA}
      barWidth={DATA.length > 6 ? 100 : 40}
      spacing={5}
      noOfSections={max > 3000 ? 7 : 5}
      stepValue={max > 1250 ? 500 : max > 750 ? 200 : max > 500 ? 150 : 100}
      xAxisThickness={1}
      xAxisLabelTextStyle={{ color: LIGHT }}
      yAxisThickness={1}
      yAxisTextStyle={{ color: LIGHT }}
      topLabelTextStyle={{ color: LIGHT }}
      showValuesAsTopLabel={true}
    />
  );
}
