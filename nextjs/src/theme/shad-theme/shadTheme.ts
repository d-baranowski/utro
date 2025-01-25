import {createTheme} from '@mui/material';
import {amber, common, green, grey, lightBlue, red} from '@mui/material/colors';
import {shadThemeShadows} from './shadows';

export const shadTheme = (mode: 'light' | 'dark') => {
  const isDarkMode = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#000000', // Black
      },
      secondary: {
        main: '#808080', // Gray
      },
      success: {
        main: green['900'],
      },
      error: {
        main: red['900'],
      },
      info: {
        main: lightBlue['900'],
      },
      warning: {
        main: amber['900'],
      },
      divider: isDarkMode ? grey[800] : grey[300],
      background: {
        default: '#FF0000', // Default page background
        paper: '#0000ff',   // Background for Paper components
      },
    },
    shape: {
      borderRadius: 4,
    },
    spacing: 8,
    typography: {
      fontSize: 14,
      htmlFontSize: 18,
      fontFamily: [
        'Noto Sans',
        '"Source Sans Pro"',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontWeightMedium: 600,
      fontWeightBold: 700,
      h1: {
        fontSize: '3.75rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '2.125rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
    },
    shadows: shadThemeShadows,
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? common['black'] : common['white'],
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
          },
          sizeSmall: {
            padding: '2px 12px',
          },
          sizeMedium: {
            padding: '6px 18px',
          },
          sizeLarge: {
            padding: '10px 24px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: 0,
            borderBottom: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            border: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
          },
        },
      },
    },
  });
};
