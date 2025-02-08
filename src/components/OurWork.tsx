'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EnergyIcon from '@mui/icons-material/ElectricBolt';
import WaterIcon from '@mui/icons-material/WaterDrop';
import AgricultureIcon from '@mui/icons-material/Grass';

// Animations
const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.1, rotate: 3, transition: { duration: 0.3 } },
};

const iconVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.1, transition: { yoyo: Infinity, duration: 1.5 } },
};

export default function OurWork() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 0',
                backgroundColor: theme.palette.background.default,
                width: '100%',
            }}
        >
            <Typography variant="h2" color="primary" fontWeight="bold" sx={{ marginBottom: 6 }}>
                Our Work
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8,
                    width: '90%',
                    flexWrap: 'wrap',
                }}
            >
                {/* Energy Box */}
                <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
                    <Link href="/energy" passHref>
                        <Box
                            sx={{
                                width: 350,
                                height: 400,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '25px',
                                boxShadow: 6,
                                cursor: 'pointer',
                                textAlign: 'center',
                                padding: 4,
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <motion.div variants={iconVariants} initial="initial" animate="animate">
                                <EnergyIcon sx={{ fontSize: 100, color: 'white' }} />
                            </motion.div>
                            <Typography variant="h4" color="white" sx={{ marginTop: 3 }}>
                                Energy
                            </Typography>
                            <Typography variant="body1" color="white" sx={{ marginTop: 2 }}>
                                Renewable energy for a sustainable future.
                            </Typography>
                        </Box>
                    </Link>
                </motion.div>

                {/* Water Box */}
                <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
                    <Link href="/water" passHref>
                        <Box
                            sx={{
                                width: 350,
                                height: 400,
                                background: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.error.main})`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '25px',
                                boxShadow: 6,
                                cursor: 'pointer',
                                textAlign: 'center',
                                padding: 4,
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <motion.div variants={iconVariants} initial="initial" animate="animate">
                                <WaterIcon sx={{ fontSize: 100, color: 'white' }} />
                            </motion.div>
                            <Typography variant="h4" color="white" sx={{ marginTop: 3 }}>
                                Water
                            </Typography>
                            <Typography variant="body1" color="white" sx={{ marginTop: 2 }}>
                                Protecting water resources for all.
                            </Typography>
                        </Box>
                    </Link>
                </motion.div>

                {/* Agriculture Box */}
                <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
                    <Link href="/agriculture" passHref>
                        <Box
                            sx={{
                                width: 350,
                                height: 400,
                                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.warning.main})`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '25px',
                                boxShadow: 6,
                                cursor: 'pointer',
                                textAlign: 'center',
                                padding: 4,
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <motion.div variants={iconVariants} initial="initial" animate="animate">
                                <AgricultureIcon sx={{ fontSize: 100, color: 'white' }} />
                            </motion.div>
                            <Typography variant="h4" color="white" sx={{ marginTop: 3 }}>
                                Agriculture
                            </Typography>
                            <Typography variant="body1" color="white" sx={{ marginTop: 2 }}>
                                Sustainable farming practices for the future.
                            </Typography>
                        </Box>
                    </Link>
                </motion.div>
            </Box>
        </Box>
    );
}
