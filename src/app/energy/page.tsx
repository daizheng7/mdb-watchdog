import { Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function EnergyPage() {
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', backgroundColor: '#E6EBD8', paddingTop: '20px' }}>
            <Navbar />
            <Typography variant="h2">Energy</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Information about energy-related projects and analysis.
            </Typography>
        </Container>
    );
}
