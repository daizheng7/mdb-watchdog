'use client';

import { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Categories for filtering
const categories = ['All', 'Energy', 'Water', 'Agriculture'];

// Dummy data (Replace with CSV data fetching)
const dummyProjects = [
    { id: 1, title: 'Solar Power Initiative', category: 'Energy', url: '/solar.jpg', description: 'Expanding solar capacity in Punjab.' },
    { id: 2, title: 'Water Purification Karachi', category: 'Water', url: '/water.jpg', description: 'Enhancing water quality for urban areas.' },
    { id: 3, title: 'Sustainable Farming Lahore', category: 'Agriculture', url: '/farming.jpg', description: 'Introducing organic farming techniques.' },
    { id: 4, title: 'Wind Energy Islamabad', category: 'Energy', url: '/wind.jpg', description: 'New wind farms to power northern regions.' },
    { id: 5, title: 'Irrigation Project Sindh', category: 'Water', url: '/irrigation.jpg', description: 'Improving rural irrigation infrastructure.' },
    { id: 6, title: 'Smart Agriculture Gujranwala', category: 'Agriculture', url: '/smart-farm.jpg', description: 'AI-driven farming innovation.' },
];

export default function FeaturedProjects() {
    const theme = useTheme();
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);

    // Filtered items based on selected category
    const filteredItems = activeCategory === 'All' ? dummyProjects : dummyProjects.filter((item) => item.category === activeCategory);
    const selectedProject = filteredItems[selectedIndex] || filteredItems[0];
    const visibleThumbnails = filteredItems.slice(startIndex, startIndex + 5);

    // Navigation handlers
    const handleNext = () => setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    const handleNextThumbnails = () => startIndex + 5 < filteredItems.length && setStartIndex((prev) => prev + 1);
    const handlePrevThumbnails = () => startIndex > 0 && setStartIndex((prev) => prev - 1);

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '100vh',
                py: 6,
                bgcolor: 'background.paper',
                color: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Section Title */}
            <Typography variant="h3" fontWeight="bold" color="primary.main" mb={4}>
                Featured Projects
            </Typography>

            {/* Filter Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? 'contained' : 'outlined'}
                        color="primary"
                        sx={{ fontSize: '16px', fontWeight: 'bold', px: 3, py: 1.5 }}
                        onClick={() => {
                            setActiveCategory(category);
                            setSelectedIndex(0);
                            setStartIndex(0);
                        }}
                    >
                        {category}
                    </Button>
                ))}
            </Box>

            <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', maxWidth: '1200px', flexGrow: 1 }}>
                {/* Featured Project */}
                <Grid item xs={12} md={7}>
                    <motion.div key={selectedProject?.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <Card sx={{ width: '100%', height: '100%', boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
                            <CardMedia component="img" height="450" image={selectedProject?.url || '/default.jpg'} alt={selectedProject?.title} />
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}>
                                    {selectedProject?.title || 'Untitled Project'}
                                </Typography>
                                <Typography variant="body1" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
                                    {selectedProject?.description || 'No description available.'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                {/* Thumbnail Previews */}
                <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%' }}>
                        {filteredItems.length > 5 && (
                            <IconButton onClick={handlePrevThumbnails} disabled={startIndex === 0} sx={{ color: theme.palette.primary.main }}>
                                <FaChevronUp size={24} />
                            </IconButton>
                        )}

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {visibleThumbnails.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setSelectedIndex(startIndex + index)}
                                    style={{ width: '100%' }}
                                >
                                    <Card sx={{ width: '100%', boxShadow: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                                        <CardContent>
                                            <Typography variant="body1" fontWeight="bold" color={theme.palette.text.primary}>
                                                {item.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </Box>

                        {filteredItems.length > 5 && (
                            <IconButton onClick={handleNextThumbnails} disabled={startIndex + 5 >= filteredItems.length} sx={{ color: theme.palette.primary.main }}>
                                <FaChevronDown size={24} />
                            </IconButton>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
