import { ThemeMode } from '@/app/app-reducer';
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff6b6b',
        light: '#ff8e8e',
        dark: '#c94f4f',
        contrastText: '#ffffff',
      },
      success: {
        main: '#4caf50',
      },
      warning: {
        main: '#ffb74d',
      },
      error: {
        main: '#f44336',
      },
      info: {
        main: '#42a5f5',
      },
      // Явно переопределяем background для каждого mode
      ...(mode === 'light' 
        ? {
            background: {
              default: '#f5f9f0',  // светлый зеленоватый
              paper: '#ffffff',
            },
            text: {
              primary: '#1c2e1c',
              secondary: '#2e4c2e',
            },
          }
        : {
            background: {
              default: '#121212',  // темный фон по умолчанию
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
          }
      ),
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      h4: {
        fontWeight: 700,
        color: mode === 'light' ? '#1c2e1c' : '#ffffff',
      },
      h5: {
        fontWeight: 600,
        color: mode === 'light' ? '#1c2e1c' : '#ffffff',
      },
      button: {
        fontWeight: 400,
        letterSpacing: '0.5px',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '1rem',
            padding: '8px 24px',
            boxShadow: '0 4px 8px rgba(46, 125, 50, 0.2)',
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
              boxShadow: '0 6px 12px rgba(46, 125, 50, 0.3)',
            },
          },
          containedSecondary: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #c94f4f 0%, #ff6b6b 100%)',
              boxShadow: '0 6px 12px rgba(255, 107, 107, 0.3)',
            },
          },
          outlinedPrimary: {
            borderColor: '#2e7d32',
            borderWidth: '2px',
            color: '#2e7d32',
            '&:hover': {
              borderColor: '#4caf50',
              borderWidth: '2px',
              backgroundColor: 'rgba(76, 175, 80, 0.08)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'rgba(46, 125, 50, 0.12)',
              transform: 'scale(1.1)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          primary: {
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          },
          secondary: {
            backgroundColor: '#ff6b6b',
            '&:hover': {
              backgroundColor: '#c94f4f',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#2e7d32',
            color: '#ffffff',
          },
          colorSecondary: {
            backgroundColor: '#ff6b6b',
            color: '#ffffff',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: '#ff6b6b',
            '&.Mui-checked': {
              color: '#2e7d32',
            },
            '&.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#4caf50',
            },
          },
          track: {
            backgroundColor: '#ff8e8e',
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: {
            color: '#2e7d32',
          },
          track: {
            color: '#4caf50',
          },
          rail: {
            color: '#c8e6c9',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#2e7d32',
            color: '#ffffff',
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: '#ff6b6b',
            color: '#ffffff',
          },
        },
      },
      // Добавляем стили для InputBase (инпуты)
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: mode === 'light' 
                ? '1px solid rgba(0, 0, 0, 0.42)' 
                : '1px solid rgba(255, 255, 255, 0.42)',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: mode === 'light'
                ? '2px solid #2e7d32'
                : '2px solid #4caf50',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: mode === 'light'
              ? 'rgba(0, 0, 0, 0.23)'
              : 'rgba(255, 255, 255, 0.23)',
          },
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? '#2e7d32' : '#4caf50',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2e7d32',
              borderWidth: '2px',
            },
          },
        },
      },
    },
  });
};