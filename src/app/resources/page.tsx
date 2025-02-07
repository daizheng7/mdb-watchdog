import { Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function ResourcesPage() {
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', backgroundColor: '#E6EBD8', paddingTop: '20px' }}>
            <Navbar />
            <Typography variant="h2">Resources</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Access various reports, data, and documents related to MDB Watchdog.
            </Typography>
        </Container>
    );
}
