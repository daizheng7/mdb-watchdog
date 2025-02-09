import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import OurWork from '@/components/OurWork';
import HeroMap from '@/components/HeroMap';
import SummaryHome from '@/components/SummaryHome';
import WhatWeWatch from '@/components/WhatWeWatch';
import WhyWeAreWatching from '@/components/WhyWeAreWatching';
import FeaturedProjects from '@/components/FeaturedProjects';
import MapPage from '@/components/MapPage';
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
            <HeroMap />
            <SummaryHome />
            <WhyWeAreWatching />
            <OurWork />
            <FeaturedProjects />
            <WhatWeWatch />
        </Box>
    );
}
