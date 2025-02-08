'use client';

import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGlobe, FaBuilding, FaHandshake } from 'react-icons/fa';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // MDBs Icon
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Funding Icon
import BusinessIcon from '@mui/icons-material/Business'; // CPEC Icon

// Animation variants
const cardVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.05, opacity: 1, transition: { duration: 0.3 } },
};

// Organizations being monitored
const watchList = [
    {
        id: 1,
        name: 'World Bank (WB)',
        description: 'Tracking WB-funded projects for transparency and effectiveness.',
        icon: <AccountBalanceIcon sx={{ fontSize: 50, color: '#8FBC8F' }} />, // Using primary green
    },
    {
        id: 2,
        name: 'Asian Development Bank (ADB)',
        description: 'Monitoring ADB investments and their social impact.',
        icon: <AttachMoneyIcon sx={{ fontSize: 50, color: '#FCE883' }} />, // Using warning yellow
    },
    {
        id: 3,
        name: 'China-Pakistan Economic Corridor (CPEC)',
        description: 'Analyzing CPEC’s economic and environmental effects.',
        icon: <BusinessIcon sx={{ fontSize: 50, color: '#564F7D' }} />, // Using secondary purple
    },
    {
        id: 4,
        name: 'Other Development Banks & Bilateral Donors',
        description: 'Ensuring accountability in financing from institutions like AIIB, IMF, and UN agencies.',
        icon: <FaHandshake size={50} color="#8B0000" />, // Using error dark red
    },
];

export default function WhatWeWatch() {
    return (
        <Box
            sx={{
                textAlign: 'center',
                backgroundColor: 'background.default',
                padding: '80px 0',
            }}
        >
            <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold', marginBottom: 4 }}>
                What Are We Watching?
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', maxWidth: '800px', margin: '0 auto 40px' }}>
                MDB Watchdog tracks major international funding and infrastructure projects to ensure transparency,
                accountability, and impact assessment.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {watchList.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                        <motion.div variants={cardVariants} initial="initial" whileHover="hover">
                            <Card
                                sx={{
                                    height: 220,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 3,
                                    boxShadow: 5,
                                    borderRadius: '15px',
                                    backgroundColor: 'background.paper',
                                    textAlign: 'center',
                                }}
                            >
                                {item.icon}
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
