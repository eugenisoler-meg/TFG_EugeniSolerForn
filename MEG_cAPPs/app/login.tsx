import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import * as Utils from '../constants/utils';

export default function App() {
  const [dni, setDNI] = useState('');
  const [data_naixement, setDataNaixement] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  const login = async () => {
    setLoading(true);
    setError(false);

    try {
       const res = await fetch(`https://testapi.escoltesiguies.cat/login?dni=${dni}&data_naixement=${Utils.parseDate(data_naixement)}`, 
       {method: "GET", headers: {"Content-Type": "application/json"},});
      const json = await res.json();
      setData(json);

      if (json.error) throw new Error(json.error || 'Error during login');

      await SecureStore.setItemAsync('USER', JSON.stringify(json.success.user));
      Alert.alert('SUCCESS', 'Login successful');
      
    } catch (e) {
      setError(true);
      console.log(e);
      if (e instanceof Error) {
        Alert.alert('ERROR', e.message);
      } else {
        Alert.alert('ERROR', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
      
  };

  return (
    <View style={{ padding: 20 }}>
      <Text></Text>
      <Text></Text>
       <Text>ID</Text>
      <TextInput
        value={dni}
        onChangeText={setDNI}
        placeholder="Enter ID"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>Date</Text>
      <Button title="Escull data" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={data_naixement}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setDataNaixement(selectedDate);
          }}
        />
      )}

      <Text style={{ marginVertical: 10 }}>
        Selected date: {data_naixement.toISOString().split('T')[0]}
      </Text>

      <Button title="Login" onPress={login} />
    </View>
  );
}
