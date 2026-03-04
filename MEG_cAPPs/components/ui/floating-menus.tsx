import { TouchableWithoutFeedback, View, Pressable, StyleSheet, Text } from "react-native";
import * as Utils from '@/constants/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { FOOTER_HEIGHT, PADDING } from "@/constants/styles";
import { router } from "expo-router";

function FloatingMenu({data, menuStyle, closeMenu} : {data: readonly any[], menuStyle: any, closeMenu: ()=>void}){
  return (<TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.overlay}>
            <View style={menuStyle}>
                {data.map((item) => (
                  <Pressable
                  key={item.label}
                  style={styles.menuItem}
                  onPress={ () => { closeMenu(); Utils.openExternalURL(item.route);} }
                  >
                    <View style={styles.iconContainer}>
                    {item.icon}  
                    </View>
                    <Text style={styles.menuText}>{item.label}</Text>
                </Pressable>
                ))}
            </View>
        </View>
    </TouchableWithoutFeedback>
    );
  }


export const DIRECTORIES = [
  { label: "ComptaCAU", icon: <FontAwesome5 name={'money-bill-wave'} size={24} color="black" />, route: "https://comptacau.escoltesiguies.cat/" },
  { label: "Espai del Cap", icon: <FontAwesome5 name={'user-alt'} size={24} color="black" />, route: "https://www.escoltesiguies.cat/espai-del-cap" },
  { label: "Xarxameg", icon: <FontAwesome5 name={'mixer'} size={24} color="black" />, route: "https://fundacioescoltesiguies.cat/espai-de-trobada/" },
  { label: "Dossier", icon: <FontAwesome5 name={'file-alt'} size={24} color="black" />, route: "https://dossier.escoltesiguies.cat/" },
] as const;

export function Directories({closeMenu} : {closeMenu : ()=>void}){
  return FloatingMenu({data: DIRECTORIES, menuStyle: styles.menuDirectory, closeMenu})
}

export const ENTITY_OPTIONS = [
  { label: "Mapa d'agrupaments", icon: <Entypo name={'map'} size={24} color="black" />, route: "https://www.instamaps.cat/instavisor/b30f5fe7515fc80979201677a66388c9/Mapa_d_AEiGs_-_MEG.html" },
  { label: "L'entitat en xifres", icon: <Entypo name={'bar-graph'} size={24} color="black" />, route: "https://www.escoltesiguies.cat/espai-del-cap" },
  { label: "Contacta amb altres AEiG", icon: <MaterialCommunityIcons name="message-fast-outline" size={24} color="black" />, route: "https://dossier.escoltesiguies.cat/" },
] as const;

export function EntityOptions({closeMenu}: {closeMenu : ()=>void}){
  return FloatingMenu({data: ENTITY_OPTIONS, menuStyle: styles.entityOptions, closeMenu})
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuItem: {
    borderBottomWidth:1,
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#eee',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  menuText: {
    marginLeft:10,
    fontSize: 15,
    fontWeight: 500,
    textDecorationLine: 'underline', 
  },
  iconContainer:{ width: 40, justifyContent: 'center',alignItems: 'center',  },
  menuDirectory: {
    bottom: FOOTER_HEIGHT,
    left: 0,
    position: "absolute",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5,
    width:200,
    boxShadow: '2px 0 2px #000'
  },
  entityOptions:{
    bottom: FOOTER_HEIGHT,
    left: 50,
    position: "absolute",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5,
    width:250,
    boxShadow: '2px 0 2px #000'
  },
});