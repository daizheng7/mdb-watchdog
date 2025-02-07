import { Container } from '@mui/material';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: '#E6EBD8', minHeight: '100vh', padding: 0 }}>
            <Navbar />
            <Hero />
        </Container>
    );
}
