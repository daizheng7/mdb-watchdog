'use client';

import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublicIcon from '@mui/icons-material/Public';
import GavelIcon from '@mui/icons-material/Gavel';

// Animation Variants
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Reasons for Watching
const reasons = [
    { icon: <WarningAmberIcon sx={{ fontSize: 80, color: 'error.main' }} />, text: 'Ensuring transparency in global projects.' },
    { icon: <VisibilityIcon sx={{ fontSize: 80, color: 'info.main' }} />, text: 'Monitoring impacts on communities.' },
    { icon: <PublicIcon sx={{ fontSize: 80, color: 'primary.main' }} />, text: 'Upholding environmental safeguards.' },
    { icon: <GavelIcon sx={{ fontSize: 80, color: 'secondary.main' }} />, text: 'Demanding accountability from institutions.' },
];

export default function WhyWeAreWatching() {
    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                py: 10,
                px: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="h2" fontWeight="bold" sx={{ mb: 4 }}>
                Why We Are Watching
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {reasons.map((reason, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {reason.icon}
                                <Typography variant="h6" fontWeight="medium">
                                    {reason.text}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
