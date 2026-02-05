import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useRef, useState } from "react";
import * as STYLES from '@/constants/styles';
import {router} from 'expo-router';

const { width  } = Dimensions.get("window");
const CARD_MARGIN = 16;
const CARD_WIDTH = width - CARD_MARGIN * 2;

export interface UnitatCard {
  id: string;
  unitat_nom: string;
  aeig_nom: string;
  branca: string;
};

export default function UnitatsActives({ unitats }: { unitats: UnitatCard[] }) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    return <View>
      {unitats.length === 0 ? (
        <UnitatCard title="Cap unitat activa." subtitle="" disabled />
      ) : (  <>
          {/* 🔵 DOTS */}
          <View style={styles.dotsContainer}>
            {unitats.map((_, i) => {
              const inputRange = [(i - 1) * CARD_WIDTH, i * CARD_WIDTH, (i + 1) * CARD_WIDTH,];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1.75, 1],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,i === index && styles.dotActive,
                    { transform: [{ scale }] },
                  ]}
                />
              );
            })}
          </View>
          
          {/* UNITATS */}
          <Animated.FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={unitats}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(e) => {
              const i = Math.round(
                e.nativeEvent.contentOffset.x /
                  (CARD_WIDTH + CARD_MARGIN * 2)
              );
              setIndex(i);
            }}
            renderItem={({ item }) => (
              <UnitatCard
                title={item.unitat_nom}
                subtitle={item.aeig_nom}
                branca = {item.branca}
                onPress = { () => {
                  router.push({
                    pathname: "/(app)/(aeig)/(unitat)/unitat",
                    params: { unitat_id: item.id }});
                  }}
              />
            )}
          />
        </>
      )}
      </View>;
}

      function UnitatCard({ title, subtitle, disabled, branca, onPress }: 
        { title: string; subtitle: string; disabled?: boolean; branca?:string, onPress?: () => void; }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.unitatCard,
        disabled && styles.disabled,
        branca && {backgroundColor : STYLES.BRANCA_COLORS[branca] }
      ]}
    >
      <Ionicons
        name="business-outline"
        size={50}
        style={styles.icon}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  carouselContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderColor: '#222',
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: "#222",
  },
   unitatCard: {
    width: CARD_WIDTH,
    height: 130,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  cardSubtitle: {
    marginTop: 4,
    color: "#666",
  },
  icon: {
    marginRight: 16,
  },
  disabled: {
    backgroundColor: '#666',
    opacity: 0.4,
  },
});