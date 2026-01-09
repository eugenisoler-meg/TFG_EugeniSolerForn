import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';

export default function App() {
  const [id, setId] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const login = async () => {
    try {
      const res = await fetch("https://testapi.escoltesiguies.cat/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({dni: "24414832X", birthdate: "2003-03-02"})
      });

      const text = await res.text();
      console.log(text);
      
      const data = await res.json();

      if (res.ok) {
        await SecureStore.setItemAsync("token", data.token);
        console.log("Logged in!", data.user);
      } else {
        alert(data.error);
      }

      // Extract JSON part
      const jsonStart = text.indexOf('{');
      const jsonText = text.slice(jsonStart);
      const result = JSON.parse(jsonText);

      if (result.status === 'success') {
        Alert.alert('Success', 'Login successful');
      } else {
        Alert.alert('Error', 'Login failed');
      }
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
        value={id}
        onChangeText={setId}
        placeholder="Enter ID"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Text>Date</Text>
      <Button title="Pick date" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={{ marginVertical: 10 }}>
        Selected date: {date.toISOString().split('T')[0]}
      </Text>

      <Button title="Login" onPress={login} />
    </View>
  );
}
