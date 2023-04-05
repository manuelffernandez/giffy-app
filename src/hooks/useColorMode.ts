import {
  ColorModeContext,
  type ColorModeType,
} from '@/context/ColorModeProvider';
import { useContext } from 'react';

export const useColorMode = (): ColorModeType => {
  return useContext<ColorModeType>(ColorModeContext);
};
