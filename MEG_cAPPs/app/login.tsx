import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import * as Utils from '../constants/utils';
import * as DATABASE from '../constants/database';
import * as MODEL from '../constants/model';
import LoadingScreen from './loading';
import { router } from "expo-router";
import ErrorScreen from './error';

export default function App() {
  const [dni, setDNI] = useState('');
  const [data_naixement, setDataNaixement] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const preLoad = async () => {
      const USER = await Utils.getUserLoggedIn();
      if (USER) {
        // TESTING PURPOSES ONLY
        router.push('./(app)/dashboard');
        setDNI(USER.dni);
        setDataNaixement(new Date(USER.data_naixement));
      }
    };
    preLoad();
  }, []);
  

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      if(dni === '' || data_naixement === null) {
        Alert.alert('ERROR', 'Els dos camps són necessaris per iniciar sessió.');
        setLoading(false);
        return;
      }
      const res = await Utils.tryLogin(dni, data_naixement);
      const user = await Utils.cleanResponse(res);
      setData(user);

      const USER = JSON.parse(user.user) as MODEL.User;
      await Utils.storeUser(USER)
        .then(async() => await DATABASE.getAfiliatByAfiliatID(USER.afiliat_id))
          .then(afiliat => {
              afiliat = JSON.parse(afiliat);

              Alert.alert('SESSIÓ INICIADA', 'Hola, ' + afiliat.nom + ' ' +afiliat.cognoms +'! \n :)');
              router.replace('./(app)/dashboard');
            });

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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
      
      {/* FORMULARI */}
      <Text>USUARI (DNI/NIE)</Text>
      <TextInput
        value={dni}
        onChangeText={setDNI}
        autoCapitalize='characters'
        placeholder="Introdueix el teu DNI"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>DATA DE NAIXEMENT</Text>
      <Button title={data_naixement ? Utils.parseDate(data_naixement) : "Escull data"} onPress={() => setShowPicker(true)} />
      
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
      <Button title="Inicia sessió" onPress={login} />
    </View>
  );
}
