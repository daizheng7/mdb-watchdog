import { Container, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', backgroundColor: '#E6EBD8', paddingTop: '20px' }}>
            <Navbar />
            <Typography variant="h2">About MDB Watchdog</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                This page provides information about the MDB Watchdog project.
            </Typography>
        </Container>
    );
}
