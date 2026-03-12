import { BRANCA_COLORS } from "@/constants/styles";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const BRANCA_ORDRE = {
  CiLL : 1,
  LLiD: 2,
  RiNG: 3,
  PiC: 4,
  Truc: 5
}  as {[key:string]: number};
export default function InfantsBar({DATA}:{DATA: {value: number, label: string, frontColor: string,}[]}) {
  DATA = DATA.sort( (a,b)=> BRANCA_ORDRE[b.label] - BRANCA_ORDRE[a.label]);
  const max = DATA.sort( (a,b) => b.value - a.value).map(e => e.value)[0];
  return (
      <BarChart
        data={DATA}
        barWidth={40}
        spacing={5}
        noOfSections={Math.ceil(max/10)}
        stepValue={10}
        yAxisThickness={1}
        xAxisThickness={1}
      />
  );
}