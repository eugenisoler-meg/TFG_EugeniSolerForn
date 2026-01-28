import { __LLEI } from "@/constants/utils";
import { View, ActivityIndicator, Text } from "react-native";

export default function LoadingScreen() {
  const puntLlei = __LLEI[Math.floor(Math.random() * __LLEI.length)];
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text>{puntLlei}</Text>
        <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" />
        </View>
    </View>
  );
}