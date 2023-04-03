import darkTheme from '@/themes/darkTheme';
import lightTheme from '@/themes/lightTheme';
import { ThemeProvider, type Theme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface ColorModeType {
  colorMode: { toggleColorMode: () => void };
  actualMode: string;
}

export const ColorModeContext = createContext<ColorModeType>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as ColorModeType
);

export default function ColorModeProvider(props: Props): JSX.Element {
  const { children } = props;
  const [mode, setMode] = useState<Theme>(lightTheme);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode =>
          prevMode.palette.mode === 'light' ? darkTheme : lightTheme
        );
      },
    }),
    []
  );

  const actualMode: string = mode.palette.mode;

  const theme = useMemo(() => mode, [mode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, actualMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
