import { ThemedText } from "@/components/themed-text";
import { __LLEI } from "@/constants/utils";
import * as STYLES from "@/constants/styles";
import { View, ActivityIndicator, Text } from "react-native";

export default function LoadingScreen() {
  const puntLlei = __LLEI[Math.floor(Math.random() * __LLEI.length)] as string;
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <ThemedText type='subtitle' style={{ fontSize: 24}}>{puntLlei}</ThemedText>
        <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color={STYLES.BRANCA_COLORS[Math.floor(Math.random() * Object.keys(STYLES.BRANCA_COLORS).length)]}/>
        </View>
    </View>
  );
}