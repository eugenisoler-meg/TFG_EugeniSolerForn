import { BRANCA_COLORS } from "@/constants/styles";
import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

// Example API data
const apiData = [
  { branca: "A", total: 15 },
  { branca: "B", total: 7 },
  { branca: "C", total: 22 },
];

// Optional: only show subset
const selectedBrancas = ["A", "C"];
const filteredData = apiData.filter(item =>
  selectedBrancas.includes(item.branca)
);

// Assign colors to each bar
export default function BarGraphScreen() {
  const [animatedData, setAnimatedData] = useState(
    filteredData.map(item => ({ ...item, total: 0 }))
  );

  // Animate bars on mount
  useEffect(() => {
    setTimeout(() => {
      setAnimatedData(filteredData);
    }, 300);
  }, []);

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <VictoryChart
        width={screenWidth * 0.9}
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryBar
          data={animatedData}
          x="branca"
          y="total"
          animate={{ duration: 800 }}
          style={{
            data: {
              fill: ({ index }: {index:string}) => BRANCA_COLORS[index], // different color per bar
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}