import React from "react";
import { BarChart } from "react-native-gifted-charts";

const BRANCA_ORDRE = {
  CiLL : 1,
  LLiD: 2,
  RiNG: 3,
  PiC: 4,
  Truc: 5
}  as {[key:string]: number};
export default function InfantsBar({DATA}:{DATA: {value: number, label: string, frontColor: string,}[]}) {
  const max = DATA.sort( (a,b) => b.value - a.value).map(e => e.value)[0];
  DATA = DATA.sort( (a, b) => BRANCA_ORDRE[a.label] - BRANCA_ORDRE[b.label]);
  return (
      <BarChart
        data={DATA}
        barWidth={40}
        spacing={5}
        noOfSections={max/500 > 5 ? max/400 : 5}
        stepValue={max/500 > 5 ? 500 : Math.ceil(max/5/100)*100}
        yAxisThickness={1}
        xAxisThickness={1}
      />
  );
}