import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import * as STYLES from "@/constants/styles";
import { __LLEI } from "@/constants/utils";
import { ActivityIndicator, View } from "react-native";

export default function LoadingScreen() {
  const puntLlei = __LLEI[Math.floor(Math.random() * __LLEI.length)] as string;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#050505",
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 360,
          alignItems: "center",
          padding: 24,
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.06)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.16,
          shadowRadius: 20,
          elevation: 6,
        }}
      >
        <Logo size={120} />
        <ThemedText
          type="subtitle"
          style={{
            fontSize: 20,
            textAlign: "center",
            marginBottom: 18,
            color: "#fff",
          }}
        >
          {puntLlei}
        </ThemedText>
        <ActivityIndicator
          size="large"
          color={
            STYLES.BRANCA_COLORS[
              Object.keys(STYLES.BRANCA_COLORS)[
                Math.floor(
                  Math.random() * Object.keys(STYLES.BRANCA_COLORS).length,
                )
              ]
            ]
          }
        />
      </View>
    </View>
  );
}
