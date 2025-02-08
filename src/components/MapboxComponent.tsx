'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

// Mapbox API Token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Dynamic import to prevent SSR issues in Next.js
const Map = dynamic(() => import('@vis.gl/react-mapbox').then((mod) => mod.Map), { ssr: false });
const Marker = dynamic(() => import('@vis.gl/react-mapbox').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('@vis.gl/react-mapbox').then((mod) => mod.Popup), { ssr: false });

export default function MapboxTest() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load CSV File
        fetch('/projects.csv')
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setProjects(results.data);
                        setLoading(false);
                    },
                });
            })
            .catch((error) => console.error('Error loading CSV:', error));
    }, []);

    return (
        <Box sx={{ width: '100%', height: '500px', marginTop: 4, borderRadius: '10px', overflow: 'hidden' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Map
                    initialViewState={{
                        longitude: 69.3451, // Centered on Pakistan
                        latitude: 30.3753,
                        zoom: 5,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    {projects.map((project, index) => (
                        <Marker
                            key={index}
                            longitude={parseFloat(project.lon)}
                            latitude={parseFloat(project.lat)}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setSelectedProject(project);
                            }}
                        >
                            <Typography variant="h6" sx={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                                📍
                            </Typography>
                        </Marker>
                    ))}

                    {selectedProject && (
                        <Popup
                            longitude={parseFloat(selectedProject.lon)}
                            latitude={parseFloat(selectedProject.lat)}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setSelectedProject(null)}
                        >
                            <Typography variant="h6">{selectedProject.title}</Typography>
                            <Typography variant="body2">{selectedProject.cat.toUpperCase()}</Typography>
                        </Popup>
                    )}
                </Map>
            )}
        </Box>
    );
}
