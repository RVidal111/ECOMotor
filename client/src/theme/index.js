import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import colors from './colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: colors.primary,
    accent: colors.accent,
    secondary: colors.secondary,
    error: colors.error,
    backgroundColor: colors.background,
  },
  overrides: {
  },
});

export default function Theme(props) {
  return <MuiThemeProvider theme={theme} {...props} />;
}

Theme.displayName = 'Theme';
