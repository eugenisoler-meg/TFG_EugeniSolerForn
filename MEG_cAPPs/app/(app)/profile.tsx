import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";

import CurriculumEscolta from "@/components/profile/curriculum-escolta";
import { DARK, DIRE, GRAY, LIGHT, LIGHT_GRAY, LILA, LILA_SUAU, MONI } from "@/constants/styles";
import { router } from "expo-router";
import ErrorScreen from "../error";
import LoadingScreen from "../loading";

export default function ProfileLayout() {
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<MODEL.User | null>(null);
  const [afiliat, setAfiliat] = useState<MODEL.Afiliat | null>(null);
  const [funcions, setFuncions] = useState<MODEL.Funcio[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setError(null);
      try {
        const user = await Utils.getUser();
        if (!user) {
          router.replace("../login");
          return;
        }
        setUser(user);

        const AFILIAT = (await Utils.getAfiliat()) as MODEL.Afiliat;
        setAfiliat(AFILIAT);

        const FUNCIONS = (await Utils.getFuncions()) as MODEL.Funcio[];
        setFuncions(FUNCIONS);
      } catch (e) {
        console.log(e);
        if (e instanceof Error) setError(e.message);
        else setError("S'ha produït un error desconegut.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ conditional rendering only (NO hooks here)
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!user || !afiliat) return <ErrorScreen message="Error carregant dades" />;

  const SmallCard = ({
    title,
    enabled,
    titol,
    color,
    fontColor,
  }: {
    title: string;
    enabled: boolean;
    titol?: string | number | null;
    color?: string;
    fontColor?: string;
  }) => (
    <View
      style={[
        styles.smallCard,
        !enabled && styles.disabled,
        color && { backgroundColor: color },
      ]}
    >
      <Text style={[styles.smallCardText, fontColor && { color: fontColor }]}>
        {title}
      </Text>
      {titol && (
        <Text
          style={[styles.smallCardTextSmall, fontColor && { color: fontColor }]}
        >
          {titol}
        </Text>
      )}
    </View>
  );

  const AnysCard = ({
    title,
    enabled,
    titol,
  }: {
    title: string;
    enabled: boolean;
    titol?: string | number | null;
    fontColor?: string;
  }) => (
    <View style={[styles.AnysCard, !enabled && styles.disabled]}>
      <Text style={styles.smallCardText}>{title}</Text>
      {titol && <Text style={[styles.smallCardTextSmall]}>{titol}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* MAIN PROFILE CARD */}
      <View style={styles.profileCard}>
        <Text style={styles.name}>
          {afiliat.nom + " " + afiliat.cognoms} ({afiliat.dni})
        </Text>
        <Text>
          {afiliat.email} · {afiliat.tlf}
        </Text>
      </View>

      {/* small info text */}
      <Text style={styles.infoText}>
        {" "}
        Si alguna informació no és correcta, contacta amb la secretaria del teu
        agrupament.{" "}
      </Text>

      {/* row of 2 cards */}
      <View style={styles.row}>
        <SmallCard
          title="Monitoratge"
          enabled={afiliat.num_moni ?? false}
          titol={afiliat.num_moni}
          color={MONI.color}
          fontColor={MONI.fontColor}
        />
        <SmallCard
          title="Direcció"
          enabled={afiliat.num_dire ?? false}
          titol={afiliat.num_dire}
          color={DIRE.color}
          fontColor={DIRE.fontColor}
        />
      </View>

      {/* history button */}
      <TouchableOpacity
        style={styles.funcionalitatBtn}
        onPress={() => setShowHistory(!showHistory)}
      >
        <Text style={styles.funcionalitatText}>Currículum Escolta</Text>
        {/* row of 2 cards */}
        {!showHistory && (
          <View style={styles.row}>
            <AnysCard
              title="Anys d'infant"
              enabled={funcions.filter((f) => f.rol === "infant").length > 0}
              titol={String(
                Math.round(
                  Utils.anysFuncions(
                    funcions.filter((f) => f.rol === "infant"),
                  ) * 100,
                ) / 100,
              )}
            />
            <AnysCard
              title="Anys de cap"
              enabled={funcions.filter((f) => f.rol === "cap_grups").length > 0}
              titol={String(
                Math.round(
                  Utils.anysFuncions(
                    funcions.filter((f) => f.rol === "cap_grups"),
                  ) * 100,
                ) / 100,
              )}
            />
            <AnysCard
              title="Anys de EA"
              enabled={
                funcions.filter((f) => f.grup?.endsWith("equip_agrupament"))
                  .length > 0
              }
              titol={String(
                Math.round(
                  Utils.anysFuncions(
                    funcions.filter((f) =>
                      f.grup?.endsWith("equip_agrupament"),
                    ),
                  ) * 100,
                ) / 100,
              )}
            />
          </View>
        )}
      </TouchableOpacity>
      {/* history table */}
      {showHistory && <CurriculumEscolta history={funcions} />}

      <TouchableOpacity
        style={styles.funcionalitatBtn}
        // onPress={() => setShowHistory(!showHistory)}
      >
        <Text style={styles.funcionalitatText}>Cursos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: LIGHT,
    padding: 20,
    borderRadius: 14,
    elevation: 3,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  infoText: {
    fontSize: 12,
    color: GRAY,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    color: DARK,
    gap: 10,
    marginBottom: 20,
  },

  smallCard: {
    flex: 1,
    backgroundColor: LILA_SUAU,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  AnysCard: {
    flex: 1,
    backgroundColor: GRAY,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallCardText: {
    color: LIGHT,
    fontWeight: "600",
  },
  smallCardTextSmall: {
    color: LIGHT,
    fontWeight: "400",
  },

  disabled: {
    backgroundColor: GRAY,
    color: LIGHT_GRAY,
    opacity: 0.35,
  },

  funcionalitatBtn: {
    width: "100%",
    alignSelf: "center",
    paddingVertical: 10,
    borderBottomColor: LILA,
    borderBottomWidth: 2,
    marginBottom: 20,
  },

  funcionalitatText: {
    color: LILA,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
});
