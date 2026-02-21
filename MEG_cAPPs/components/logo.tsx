import { Image } from "react-native";

export default function Logo(size: number = 250) {
  return <Image source={require('@/assets/images/MEG_color.png')} style={{ width: size, height: size * 0.8, marginBottom: 20 }} />;
}
export function Icon(size: number = 100) {
  return <Image source={require('@/assets/images/icon.png')} style={{ width: size, height: size * 0.8, marginBottom: 20 }} />;
}