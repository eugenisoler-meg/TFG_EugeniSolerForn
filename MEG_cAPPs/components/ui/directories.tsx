import { TouchableWithoutFeedback, View, Pressable, StyleSheet, Text } from "react-native";
import * as Utils from '@/constants/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { FOOTER_HEIGHT, PADDING } from "@/constants/styles";

export const DIRECTORIES = [
  { label: "ComptaCAU", icon: 'money-bill-wave', route: "https://comptacau.escoltesiguies.cat/" },
  { label: "Espai del Cap", icon: 'user-alt', route: "https://www.escoltesiguies.cat/espai-del-cap" },
  { label: "Xarxameg", icon: 'mixer', route: "https://fundacioescoltesiguies.cat/espai-de-trobada/" },
] as const;

export default function Directories({closeMenu} : {closeMenu : ()=>void}){
return (<TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.overlay}>
            <View style={styles.menu}>
                {DIRECTORIES.map((item) => (
                <Pressable
                    key={item.route}
                    style={styles.menuItem}
                    onPress={() => {
                        closeMenu();
                        Utils.openExternalURL(item.route);
                    }}
                >
                    <FontAwesome5 name={item.icon} size={24} color="black" />
                    <Text style={styles.menuText}>{item.label}</Text>
                </Pressable>
                ))}
            </View>
        </View>
    </TouchableWithoutFeedback>
    );
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
  menu: {
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
    fontSize: 14,
  },
});