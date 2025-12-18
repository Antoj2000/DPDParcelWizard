//Currently used for buttons present in the project

import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const ButtonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  primary: {
    backgroundColor: Colors.accent,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
