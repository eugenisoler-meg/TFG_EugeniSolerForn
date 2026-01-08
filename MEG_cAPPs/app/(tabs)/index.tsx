import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Alert, Button, Platform, Text, TextInput, View } from 'react-native';

export default function App() {
  const [id, setId] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const login = async () => {
    try {
      const response = await fetch(
        'https://login.escoltesiguies.cat/API_TEST/api/test_2.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `id=${encodeURIComponent(id)}&date=${date.toISOString().split('T')[0]}`
        }
      );

      const text = await response.text();
      console.log(text);
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
