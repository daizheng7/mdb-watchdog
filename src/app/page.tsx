import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OurWork from '@/components/OurWork';
import MapboxComponent from '@/components/MapboxComponent';
import HeroMap from '@/components/HeroMap';
import SummaryHome from '@/components/SummaryHome';
import WhatWeWatch from '@/components/WhatWeWatch';
export default function Home() {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Navbar />
            {/* <Hero />
            <OurWork />
            <MapboxComponent /> */}
            <HeroMap />
            <SummaryHome />
            <OurWork />
            <WhatWeWatch />
        </Box>
    );
}
