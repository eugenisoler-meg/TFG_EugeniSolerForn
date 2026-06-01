import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import { LIGHT_GRAY, LILA, PADDING } from "@/constants/styles";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as DATABASE from "../constants/database";
import * as MODEL from "../constants/model";
import * as Utils from "../constants/utils";
import ErrorScreen from "./error";
import LoadingScreen from "./loading";

const INPUT_HEIGHT = 65;
const INPUT_PADDING = 20;
const INPUT_RADIUS = 10;

export default function LoginScreen() {
  const [dni, setDNI] = useState("");
  const [data_naixement, setDataNaixement] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const colorScheme = useColorScheme();

  useEffect(() => {
    const preLoad = async () => {
      const user = await Utils.getUser();
      if (user) {
        setDNI(user.dni);
        setDataNaixement(new Date(user.data_naixement));
      }
    };
    preLoad();
  }, []);

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      if (dni === "" || data_naixement === null) {
        setLoading(false);
        setError("Els dos camps són necessaris per iniciar sessió.");
        return;
      }
      const month = String(data_naixement.getMonth() + 1).padStart(2, "0");
      const day = String(data_naixement.getDate()).padStart(2, "0");
      const year = String(data_naixement.getFullYear()).padStart(4, "0");
      const storedDevice = await Utils.getDeviceId();
      const res = await Utils.tryLogin(dni, new Date(year + '-' + month + '-' + day), storedDevice ?? undefined);

      if (res.error) {
        setError(res.error);
        return;
      }

      // If backend suggests a dispositiu_id and we don't have it, store it
      if (res.dispositiu_id && !storedDevice) {
        await Utils.setDeviceId(res.dispositiu_id);
      }

      // If a challenge is required, prompt user to check email and show OTP screen
      if (res.challenge_id) {
        Alert.alert(
          "LOGIN INTENTAT",
          "S'ha intentat iniciar sessió. Revisa el correu per l'OTP",
        );
        const params = `?challenge_id=${encodeURIComponent(res.challenge_id)}${res.dispositiu_id ? `&dispositiu_id=${encodeURIComponent(res.dispositiu_id)}` : ''}`;
        router.push(`./otp${params}`);
        return;
      }

      // Otherwise it's a successful login payload
      await Utils.finalizeLogin(res);
    } catch (e) {
      setError("Error iniciant sessió. Comprova les dades introduïdes.");
      console.log(e);

      if (e instanceof Error) return setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Logo size={180} />
      </View>

      <View style={styles.formContainer}>
        {/* CAPÇALERA */}
        <ThemedText style={styles.formTitle} type="title">
          Entra a l'aplicatiu MEG cAPP's
        </ThemedText>

        {/* FORMULARI */}
        <ThemedText style={styles.formTitleField} type="subtitle">
          USUARI (DNI/NIE)
        </ThemedText>
        <TouchableOpacity style={styles.formInput}>
          <View style={styles.iconContainer}>
            <AntDesign name="idcard" size={28} />
          </View>

          <TextInput
            value={dni}
            onChangeText={setDNI}
            autoCapitalize="characters"
            placeholder="Introdueix el teu DNI"
            placeholderTextColor={LIGHT_GRAY}
            style={[styles.formInputText]}
          />
        </TouchableOpacity>

        <ThemedText style={styles.formTitleField} type="subtitle">
          DATA DE NAIXEMENT
        </ThemedText>
        <TouchableOpacity
          style={styles.formInput}
          onPress={() => setShowPicker(true)}
        >
          <View style={styles.iconContainer}>
            {data_naixement ? (
              <MaterialCommunityIcons name="calendar-check" size={28} />
            ) : (
              <MaterialCommunityIcons name="calendar-edit" size={28} />
            )}
          </View>
          <Text style={[styles.formInputText]}> 
            {data_naixement ? Utils.formatDate(data_naixement) : "Escull data"}
          </Text>
        </TouchableOpacity>

        {/* DATE PICKER */}
        {showPicker && (
          <DateTimePicker
            value={data_naixement ?? new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(Platform.OS === "ios");
              if (selectedDate) setDataNaixement(selectedDate);
            }}
          />
        )}

        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.formSubmit}
          onPress={async () => await login()}
        >
          <Text style={styles.formSubmitText}>ENTRA</Text>
        </TouchableOpacity>
      </View>

      {/* Incidències */}
      <TouchableOpacity
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            "https://escoltesiguies.sinergiacrm.org/index.php?entryPoint=stic_AWF_renderForm&id=00000f97-dc5f-8d9f-ea9c-69fc4ff8f538",
          )
        }
      >
        <ThemedText type="link">Notificar incidència de l'aplicació</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: PADDING,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: { alignItems: "center", justifyContent: "center" },
  formContainer: { padding: PADDING, boxShadow: "0px 0px 5px 1px "+LIGHT_GRAY },
  formTitleField: { marginTop: 10 },
  formTitle: { textAlign: "center" },
  formInput: {
    backgroundColor: LIGHT_GRAY,
    height: INPUT_HEIGHT,
    padding: INPUT_PADDING,
    borderRadius: INPUT_RADIUS,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  formInputText: {
    textAlignVertical: "center",
    flex: 1,
    minHeight: 45,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "500",
  },
  formSubmit: {
    marginTop: 30,
    backgroundColor: LILA,
    height: INPUT_HEIGHT,
    padding: INPUT_PADDING,
    borderRadius: INPUT_RADIUS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formSubmitText: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    fontSize: 15,
    fontWeight: 500,
  },
  link: { marginTop: 40 },
  iconContainer: { width: 50, justifyContent: "center", alignItems: "center" },
});
