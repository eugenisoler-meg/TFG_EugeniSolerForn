import { BRANCA_COLORS } from "@/constants/styles";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";

export default function InfantsBar({DATA}:{DATA: {grup:string, total:number}[]}) {
  return (
<View style={{ height: 300 }}>
    <CartesianChart data={DATA} xKey="grup" yKeys={["total"]}>
      {({ points }) => (
        <Line points={points.total} color="red" strokeWidth={2}/>
      )}
    </CartesianChart>
</View>
  );
}