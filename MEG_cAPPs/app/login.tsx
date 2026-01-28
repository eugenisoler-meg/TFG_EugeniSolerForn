import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import * as Utils from '../constants/utils';
import LoadingScreen from './loading';
import { router } from "expo-router";
import ErrorScreen from './error';

export default function App() {
  const [dni, setDNI] = useState('');
  const [data_naixement, setDataNaixement] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  const login = async () => {
    setLoading(true);
    setError(false);
    
    try {
      if(dni === '' || data_naixement === null) {
        Alert.alert('ERROR', 'Els dos camps són necessaris per iniciar sessió.');
        setLoading(false);
        return;
      }
      const res = await Utils.tryLogin(dni, data_naixement);
      const text = await res.text();

      text.replace("<pre></pre>", ""); // Remove the pre tag
      const json = JSON.parse(text);
      setData(json);

      if (json.error) throw new Error(json.error || 'An error occurred during login');

      await SecureStore.setItemAsync('USER', json.success.user);

      Alert.alert('SESSIÓ INICIADA', 'Benvigut/uda ' + json.success.user.dni + '!');
      router.replace('./(app)/index');

    } catch (e) {
      setError(true);
      console.log(e);

      if (e instanceof Error) 
        return ErrorScreen(e.message);

    } finally {
      setLoading(false);
    }
      
  };

  if(loading) return LoadingScreen();
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
