import { AssistenciaCau, ValidacioAssistencia, ValidacioAssistenciaType } from '@/constants/model';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
export const getColorAssistencia = (state: ValidacioAssistenciaType | null) => {
  switch (state) {
    case 'No Justificada':
      return 'red';
    case 'Justificada':
      return 'orange';
    case 'Assistència':
      return 'green';
    default:
      return 'black';
  }
};
export const renderRadioButtons = (item: AssistenciaCau, changeState: (id: number, state: ValidacioAssistenciaType) => void) => {
  return (Object.keys(ValidacioAssistencia) as (keyof typeof ValidacioAssistencia)[]).map(key => (
    <TouchableOpacity
      key={key}
      style={[
        styles.radio,
        item.validada === ValidacioAssistencia[key] ? { backgroundColor: getColorAssistencia(ValidacioAssistencia[key]) } : {}
      ]}
      onPress={() => changeState(item.assistencia_id, ValidacioAssistencia[key])}
    />
  ));
};
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
