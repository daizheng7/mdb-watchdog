import { Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function WaterPage() {
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', backgroundColor: '#E6EBD8', paddingTop: '20px' }}>
            <Navbar />
            <Typography variant="h2">Water</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Information about water resource management and policies.
            </Typography>
        </Container>
    );
}
