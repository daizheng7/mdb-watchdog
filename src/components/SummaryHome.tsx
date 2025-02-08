'use client';

import { Box, Typography, Card } from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Image from 'next/image';
import { FaGlobe, FaProjectDiagram, FaDollarSign } from 'react-icons/fa';
import PeopleIcon from '@mui/icons-material/People';

// Animation variants for hover effect
const cardVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.1, opacity: 1, transition: { duration: 0.3 } },
};

// Summary Data with Icons
const summaryData = [
    {
        id: 1,
        title: 'Monitored',
        description: 'World Bank & ADB',
        image: '/wb-adb-logo.png', // Add this image in `/public`
        icon: <FaGlobe size={50} color="#8B0000" />, // Using your error color
    },
    {
        id: 2,
        title: 'Projects Tracked',
        count: 1300,
        icon: <FaProjectDiagram size={50} color="#8FBC8F" />, // Using primary green
    },
    {
        id: 3,
        title: 'Funding Tracked',
        count: 400000, // 4 Billion
        isMillion: true,
        icon: <FaDollarSign size={50} color="#FCE883" />, // Using warning yellow
    },
    {
        id: 4,
        title: 'Site Visits',
        count: 6,
        icon: <PeopleIcon sx={{ fontSize: 50, color: '#37879A' }} />, // Using info blue
    },
];

export default function SummaryHome() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
                padding: '60px 0',
                flexWrap: 'wrap',
                backgroundColor: 'background.default', // Using your theme background
            }}
        >
            {summaryData.map((item) => (
                <motion.div
                    key={item.id}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                >
                    <Card
                        sx={{
                            width: 260,
                            height: 260,
                            backgroundColor: 'background.paper', // Using theme paper background
                            borderRadius: '20px',
                            boxShadow: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: 3,
                        }}
                    >
                        {item.image ? (
                            <Image src={item.image} alt={item.title} width={120} height={60} />
                        ) : (
                            item.icon // Display the icon
                        )}
                        <Typography variant="h2" sx={{ marginTop: 1, color: 'primary.main' }}>
                            <CountUp
                                start={0}
                                end={item.count || 0}
                                duration={3}
                                separator=","
                                suffix={item.isMillion ? 'M' : ''}
                            />
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1, color: 'text.primary' }}>
                            {item.title}
                        </Typography>
                        {item.description && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                        )}
                    </Card>
                </motion.div>
            ))}
        </Box>
    );
}
