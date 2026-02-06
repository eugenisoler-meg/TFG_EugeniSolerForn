import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import * as Utils from '../constants/utils';
import * as DATABASE from '../constants/database';
import * as MODEL from '../constants/model';
import LoadingScreen from './loading';
import { router } from "expo-router";
import ErrorScreen from './error';
import { ThemedText } from '@/components/themed-text';

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
        // TESTING PURPOSES ONLY
        // router.push('./(app)/dashboard');
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
      <View style={{ padding: 20, margin: "auto", minWidth: 300, flex: 1, justifyContent: 'center' }}>
        
        {/* CAPÇALERA */}
        <ThemedText type='title'>Login</ThemedText>

        {/* FORMULARI */}
        <ThemedText type='subtitle'>USUARI (DNI/NIE)</ThemedText>
        <TextInput
          value={dni}
          onChangeText={setDNI}
          autoCapitalize='characters'
          placeholder="Introdueix el teu DNI"
          style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        />

        <ThemedText type='subtitle'>DATA DE NAIXEMENT</ThemedText>
        <Button title={data_naixement ? Utils.formatDate(data_naixement) : "Escull data"} onPress={() => setShowPicker(true)} />
        
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
        <View style={{ marginTop: 20 }}>
          <Button title="Inicia sessió" onPress={async () => {await login()}} />
        </View>
      </View>
  );
}
