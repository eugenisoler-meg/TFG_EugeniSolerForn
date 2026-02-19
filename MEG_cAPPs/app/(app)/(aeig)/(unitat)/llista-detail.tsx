import ToDoScreen from "@/app/todo";
import { useEffect, useState } from "react";
import * as MODEL from "@/constants/model";
import * as Utils from "@/constants/utils";
import * as DATABASE from "@/constants/database";
import { useLocalSearchParams, router } from "expo-router";
import LoadingScreen from "@/app/loading";
import ErrorScreen from "@/app/error";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { AssistenciaCau, ValidacioAssistenciaType } from "@/constants/model";
import { renderRadioButtons, getColorAssistencia } from "@/components/ui/radio-buttons";

export default function LlistaDetailScreen()  {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [user, setUser] = useState<MODEL.User|null>(null);
    const assistencies_cau = JSON.parse(useLocalSearchParams<{assistencies_cau?:string}>().assistencies_cau ?? "[]") as MODEL.AssistenciaCau[];
    const [data, setData] = useState<MODEL.AssistenciaCau[]>(assistencies_cau);
    const [modified, setModified] = useState(false);
useEffect(() => {
        const fetchUserData = async () => {
        setError(null);
        try {
            const user = await Utils.getUser();
            if (!user) {
                setError("La sessió no s'ha iniciat correctament.");
                router.replace("../login");
                return;
            }
            setUser(user as MODEL.User);
            if(!assistencies_cau || !Array.isArray(assistencies_cau)) setError("No s'han passat les assistències correctament.");
        } catch (e) {
            console.log(e);
            if (e instanceof Error) setError(e.message);
            else setError("S'ha produït un error desconegut.");
        } finally {
            setLoading(false);
        }
    };
   
    fetchUserData();
    }, [assistencies_cau]);

    const changeState = (id: number, newState: ValidacioAssistenciaType) => {
        setData(prev => prev.map(a => (a.assistencia_id === id ? { ...a, validada: newState } : a)));
        setModified(true);
    };
    const renderItem = ({ item }: { item: AssistenciaCau }) => (
        <View style={styles.row}>
            <Text style={[styles.name, { color: getColorAssistencia(item.validada) }]}>{item.afiliat_id}</Text>
            <View style={styles.radioGroup}>
            {renderRadioButtons(item, changeState)}
            </View>
        </View>
    );
    const save = async () => {
    try {
      Alert.alert("TODO", "Guardar les assistències a la BBDD amb l'API i DBPostController...");
      // Here you would typically send `data` to your backend or database
      console.log("Data to save:", data);
      setModified(false);
      
      Alert.alert('Saved successfully');
    } catch (err) {
      Alert.alert('Error saving data', String(err));
    }
  };

    

    if(error || !user) return ErrorScreen(error??'Error desconegut.');
    if(loading) return LoadingScreen();

return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistencies</Text>
      <FlatList
        data={data}
        keyExtractor={item => String(item.assistencia_id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    justifyContent: 'space-between'
  },
  name: { flex: 1, fontSize: 16 },
  radioGroup: { flexDirection: 'row', width: 100, justifyContent: 'space-between' },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555'
  },
  saveButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    elevation: 4
  },
  saveText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
