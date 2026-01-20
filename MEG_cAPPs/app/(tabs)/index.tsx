import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';
import * as Utils from '../../constants/utils';

export default function App() {
  const [dni, setDNI] = useState('');
  const [data_naixement, setDataNaixement] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const login = async () => {
    try {
       const res = await fetch(`https://testapi.escoltesiguies.cat/login?dni=${dni}&data_naixement=${Utils.parseDate(data_naixement)}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      }).then(response => response.text())
      .then(async r => {
          console.log("Response:", r);
          // if(!r.error) {
          //   await SecureStore.setItemAsync("token", r.token);
          //   console.log("Logged in!", r.user);
          // } else {
          //   console.log("Error logging in:", r.error);
          // }
        }
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert('Network error', error.message);
      } else {
        Alert.alert('Network error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>ID</Text>
      <TextInput
        value={dni}
        onChangeText={setDNI}
        placeholder="Enter ID"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>Date</Text>
      <Button title="Pick date" onPress={() => setShowPicker(true)} />

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
