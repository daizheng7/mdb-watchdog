import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8FBC8F', // Green
        },
        secondary: {
            main: '#564F7D', // Purple
        },
        error: {
            main: '#8B0000', // Dark Red
        },
        warning: {
            main: '#FCE883', // Yellow
        },
        info: {
            main: '#37879A', // Blue
        },
        background: {
            default: '#E6EBD8', // Light Beige
            paper: '#FFFFFF',  // Default white for cards, modals, etc.
        },
        text: {
            primary: '#212121',  // Dark gray text
            secondary: '#FFFFFF', // Light text
        }
    },
    typography: {
        fontFamily: `'Roboto', sans-serif`,
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            color: '#8B0000',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#37879A',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#212121',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    textTransform: 'none',
                    padding: '10px 20px',
                },
            },
        },
    },
});

export default theme;
