import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Utils from '../constants/utils';
import * as DATABASE from '../constants/database';
import * as MODEL from '../constants/model';
import LoadingScreen from './loading';
import { router } from "expo-router";
import ErrorScreen from './error';
import { ThemedText } from '@/components/themed-text';
import Logo from '@/components/logo';
import { LILA, PADDING } from '@/constants/styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const INPUT_HEIGHT = 65;
const INPUT_PADDING = 20;
const INPUT_RADIUS = 10;

export default function LoginScreen() {
  const [dni, setDNI] = useState('');
  const [data_naixement, setDataNaixement] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const preLoad = async () => {
      const user = await Utils.getUser();
      if(user) {
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
      if(dni === '' || data_naixement === null) {
        setLoading(false);
        setError("Els dos camps són necessaris per iniciar sessió.");
        return;
      }
      const res = await Utils.tryLogin(dni, data_naixement);
      const data = await Utils.cleanResponse(res);
      setData(data);
      
      const USER = JSON.parse(data.user) as MODEL.User;
      const AEiGs = JSON.parse(data.agrupaments) as string[];
      const Unitats = JSON.parse(data.unitats) as string[];
      await Utils.setUser(USER);

      const [afiliat_string, funcions_string] = await Promise.all([
        DATABASE.getAfiliatByAfiliatID(USER.afiliat_id),
        DATABASE.getFuncionsByAfiliatID(USER.afiliat_id)
      ]);

      const afiliat_parsed = JSON.parse(afiliat_string) as MODEL.Afiliat;
      const funcions_parsed = JSON.parse(funcions_string) as MODEL.Funcio[];
      await Promise.all([
        Utils.setFuncions(funcions_parsed), Utils.setAfiliat(afiliat_parsed), Utils.setAEiGs_ID(AEiGs), Utils.setUnitats_ID(Unitats)
      ]);
      Alert.alert(
        'SESSIÓ INICIADA',
        `Hola, ${afiliat_parsed.nom} ${afiliat_parsed.cognoms}! \n :)`
      );

      router.replace('./(app)/dashboard');

    } catch (e) {
      setError("Error iniciant sessió. Comprova les dades introduïdes.");
      console.log(e);

      if (e instanceof Error) 
        return setError(e.message);

    } finally {
      setLoading(false);
    }
      
  };

  if(loading) return LoadingScreen();
  if(error) return ErrorScreen(error);
  return (
      <View style={styles.container}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          {Logo(180)}
        </View>
        
        <View style={styles.formContainer}>
        {/* CAPÇALERA */}
        <ThemedText style={styles.formTitle} type='title'>Entra a l'aplicatiu MEG cAPP's</ThemedText>

        {/* FORMULARI */}
        <ThemedText style={styles.formTitleField} type='subtitle'>USUARI (DNI/NIE)</ThemedText>
        <TouchableOpacity style={styles.formInput}>
          <View style={styles.iconContainer}>
            <AntDesign name="idcard" size={28} color="black" />
          </View>

          <TextInput 
          value={dni}
          onChangeText={setDNI}
          autoCapitalize='characters'
          placeholder="Introdueix el teu DNI"
          style={styles.formInputText}
          />
        </TouchableOpacity>

        <ThemedText style={styles.formTitleField} type='subtitle'>DATA DE NAIXEMENT</ThemedText>
        <TouchableOpacity style={styles.formInput} onPress={()=> setShowPicker(true)}>
          <View style={styles.iconContainer}>
            {data_naixement ? 
          <MaterialCommunityIcons name="calendar-check" size={28} color="black" /> : 
          <MaterialCommunityIcons name="calendar-edit" size={28} color="black" />
        }
        </View>
          <Text style={[styles.formInputText]}>{data_naixement ? Utils.formatDate(data_naixement) : "Escull data"}</Text>
        </TouchableOpacity>
        
        {/* DATE PICKER */}
        {showPicker && (
          <DateTimePicker
          value={data_naixement ?? new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setDataNaixement(selectedDate);
          }}
          />
        )}
        
        {/* SUBMIT */}
        <TouchableOpacity style={styles.formSubmit} onPress={async ()=> await login()}>
          <Text style={styles.formSubmitText}>ENTRA</Text>
        </TouchableOpacity>
        
        </View>

        {/* Incidències */}
        <TouchableOpacity style={styles.link}>
          <ThemedText type='link'>Notificar incidència de l'aplicació</ThemedText>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{ padding: PADDING, flex: 1, justifyContent: 'center',alignItems: 'center', },
  logoContainer:{ alignItems: 'center', justifyContent:'center', },
  formContainer: { padding: PADDING, boxShadow:'0px 0px 5px 1px #ddd'},
  formTitleField: { marginTop:10 },
  formTitle: { textAlign: 'center'},
  formInput: { backgroundColor: '#ddd', height: INPUT_HEIGHT, padding: INPUT_PADDING, borderRadius: INPUT_RADIUS, flexDirection: 'row', alignSelf: 'stretch', alignItems:'center',},
  formInputText:{ textAlignVertical: 'center', flex:1, minHeight: 45, marginLeft: 15, fontSize: 15, fontWeight: 500,  },
  formSubmit: { marginTop: 30, backgroundColor: LILA, height: INPUT_HEIGHT, padding: INPUT_PADDING, borderRadius: INPUT_RADIUS, flexDirection: 'row', justifyContent:'center', alignItems:'center'},
  formSubmitText:{ textAlign:'center',textAlignVertical: 'center', flex:1, fontSize: 15, fontWeight: 500, },
  link:{marginTop:40},
  iconContainer:{ width: 50, justifyContent: 'center',alignItems: 'center',  },
} 
);