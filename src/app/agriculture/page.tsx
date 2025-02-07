import { Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function AgriculturePage() {
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', backgroundColor: '#E6EBD8', paddingTop: '20px' }}>
            <Navbar />
            <Typography variant="h2">Agriculture</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Information about agriculture initiatives and sustainability.
            </Typography>
        </Container>
    );
}
