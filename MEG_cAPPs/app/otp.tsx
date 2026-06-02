import Logo from "@/components/logo";
import { ThemedText } from "@/components/themed-text";
import { LIGHT_GRAY, LILA, PADDING } from "@/constants/styles";
import * as Utils from "@/constants/utils";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ErrorScreen from "./error";
import LoadingScreen from "./loading";

export default function OTPScreen() {
  const { challenge_id, dispositiu_id } = useLocalSearchParams<{ challenge_id?: string; dispositiu_id?: string }>();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [trust, setTrust] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const colorScheme = useColorScheme();

  const handleOtpChange = (index: number, value: string) => {
    // User pasted the whole OTP
    if (value.length > 1) {
        const digits = value.replace(/\D/g, "").slice(0, 6).split("");
        const newOtp = [...otp];

        digits.forEach((digit, i) => {
        if (index + i < 6) {
            newOtp[index + i] = digit;
        }
        });

        setOtp(newOtp);

        const nextIndex = Math.min(index + digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
        return;
    }

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
    }
    };

  const handleBackspace = (index: number, value: string) => {
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    const fullOtp = otp.join("");
    try {
      if (!challenge_id) {
        setError("Error en iniciar sessió");
        return;
      }
      if (fullOtp.length !== 6) {
        setError("Introdueix un codi de 6 dígits");
        return;
      }

      let dispositiu_ID = dispositiu_id ?? (await Utils.getDeviceId()) ?? undefined;
      if(!dispositiu_ID) {
        setError("No s'ha pogut identificar el dispositiu. Torna a iniciar sessió.");
        return;
      }

      const res = await Utils.checkOTP(String(challenge_id), fullOtp, trust, dispositiu_ID);
      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.dispositiu_id && trust) {
        await Utils.setDeviceId(res.dispositiu_id);
      }

      await Utils.finalizeLogin(res);
    } catch (e) {
      console.log(e);
      setError("Error verificant l'OTP");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={120} />
      </View>

      <View style={styles.contentContainer}>
        <ThemedText style={styles.title} type="title">
          Doble factor d'autenticació
        </ThemedText>

        <Text style={styles.subtitle}>
          Hem enviat un codi de 6 dígits al teu correu electrònic, tens 3 intents per a introduir-lo i verificar la teva identitat.
        </Text>

        {/* OTP Input Grid */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
                ref={(ref) => {
                    inputRefs.current[index] = ref;
                }}
                key={index}
                style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : styles.otpInputEmpty,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                    handleBackspace(index, digit);
                    }
                }}
                keyboardType="numeric"
                maxLength={1}
                placeholder="•"
                placeholderTextColor={LIGHT_GRAY}
                selectionColor={LILA}
                />
          ))}
        </View>

        {/* Trust Device Checkbox */}
        <TouchableOpacity
          style={styles.trustContainer}
          onPress={() => setTrust(!trust)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              trust && styles.checkboxChecked,
            ]}
          >
            {trust && (
              <MaterialCommunityIcons name="check" size={16} color={LILA} />
            )}
          </View>
          <ThemedText style={styles.trustText}>
            Confia aquest dispositiu per 30 dies
          </ThemedText>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: LILA }]}
          onPress={submit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitBtnText}>VERIFICA</Text>
        </TouchableOpacity>

        {/* Back Link */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backLink}
        >
          <ThemedText type="link">Torna a iniciar sessió</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: PADDING,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 35,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  otpInputEmpty: {
    borderColor: LIGHT_GRAY,
    backgroundColor: "#f9f9f9",
  },
  otpInputFilled: {
    borderColor: LILA,
    backgroundColor: "#f3ecff",
  },
  trustContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 30,
    minHeight: 50,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: LIGHT_GRAY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: LILA,
    backgroundColor: "#f3ecff",
  },
  trustText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    lineHeight: 20,
  },
  submitBtn: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: LILA,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  backLink: {
    alignItems: "center",
    padding: 12,
  },
});

