import ToDoScreen from "@/app/todo";
import {Text, View} from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function UnitatIndex() {
  const { data } = useLocalSearchParams();
  console.log(data);
  return <View style={{margin:'auto'}}>
            <Text>
                ID de la unitat: {data}
            </Text>
        </View>;
}