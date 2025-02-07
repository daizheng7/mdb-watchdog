import { Box, Typography, Button } from '@mui/material';

export default function Hero() {
    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundImage: 'url(/hero-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '20px',
            }}
        >
            <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '40px', borderRadius: '10px' }}>
                <Typography variant="h2" fontWeight="bold">MDB Watchdog</Typography>
                <Typography variant="h5" marginTop="10px">Monitoring and analyzing global development policies.</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginTop: '20px', padding: '10px 20px' }}
                    href="/about"
                >
                    Learn More
                </Button>
            </Box>
        </Box>
    );
}
