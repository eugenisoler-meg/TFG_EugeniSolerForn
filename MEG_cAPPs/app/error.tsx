import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function ErrorScreen(message: string) {

    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>ERROR</Text>
        <Text>{message}</Text>
        <Button onPress={() => router.replace('/')} title="Torna a iniciar sessio" />
    </View>
  );
}