import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

export default function Logo({
  size = 250,
  style,
  color,
}: {
  size?: number;
  style?: StyleProp<ImageStyle>;
  color?: string;
}) {
  return (
    <Image
      source={require("@/assets/images/MEG_color.png")}
      style={[
        { width: size, height: size * 0.8, marginBottom: 20 },
        style,
        color ? { tintColor: color } : undefined,
      ]}
    />
  );
}

export function Icon({ size = 100 }: { size?: number }) {
  return (
    <Image
      source={require("@/assets/images/icon.png")}
      style={{ width: size, height: size * 0.8, marginBottom: 20 }}
    />
  );
}
