import { AssistenciaCau, ValidacioAssistencia, ValidacioAssistenciaKeys } from '@/constants/model';
import { BRANCA_COLORS } from '@/constants/styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StyleSheet, TouchableOpacity } from 'react-native';

const ColorsAssistenciaFons: Record<ValidacioAssistenciaKeys, string> = {
  NJ: 'rgba(200,0,0, 0.4)',
  J: 'rgba(180,180,180, 0.4)',
  A: BRANCA_COLORS['trucs'],
} as const;
const ColorsAssistenciaIcons: Record<ValidacioAssistenciaKeys, string> = {
  NJ: 'rgba(200,0,0)',
  J: 'darkgray',
  A: 'white',
} as const;
const IconsAssistencia: Record<ValidacioAssistenciaKeys, string> = {
  NJ: 'xmark',
  J: 'minus',
  A: 'check'
};
export const ColorsAssistencia: Record<ValidacioAssistenciaKeys, string> = {
  NJ: 'rgba(200,0,0, 0.5)',
  J: 'rgba(180,180,180, 0.5)',
  A: 'white',
} as const;

export const renderRadioButtons = (item: AssistenciaCau, changeState: (id: number, state: ValidacioAssistenciaKeys) => void) => {
  return (Object.keys(ValidacioAssistencia) as (keyof typeof ValidacioAssistencia)[]).map(key => (
    <TouchableOpacity
      key={key}
      style={[
        styles.radio,
        item.validada === key ? { backgroundColor: ColorsAssistenciaFons[key] } : {}
      ]}
      onPress={() => changeState(item.assistencia_id, key)}
    >
      <FontAwesome6 name={IconsAssistencia[key]} size={16} color={item.validada === key ? ColorsAssistenciaIcons[key] : "gray"} />
    </TouchableOpacity>
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
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
