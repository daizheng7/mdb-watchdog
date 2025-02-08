'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import Papa from 'papaparse';

// Mapbox API Token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Dynamic import to prevent SSR issues in Next.js
const Map = dynamic(() => import('@vis.gl/react-mapbox').then((mod) => mod.Map), { ssr: false });
const Marker = dynamic(() => import('@vis.gl/react-mapbox').then((mod) => mod.Marker), { ssr: false });

// Category colors
const categoryColors = {
    energy: '#FF5733',
    water: '#37879A',
    agriculture: '#8FBC8F',
};

// Pakistani Provinces Viewpoints
const provinces = [
    { name: 'Punjab', lat: 30.79, lon: 72.56, zoom: 6 },
    { name: 'Sindh', lat: 25.92, lon: 68.67, zoom: 6 },
    { name: 'Balochistan', lat: 28.49, lon: 65.09, zoom: 5.5 },
    { name: 'Khyber Pakhtunkhwa', lat: 34.15, lon: 71.72, zoom: 6 },
    { name: 'Gilgit-Baltistan', lat: 35.32, lon: 75.54, zoom: 5.5 },
    { name: 'Azad Jammu & Kashmir', lat: 34.40, lon: 73.47, zoom: 6 },
];

// Initial View Centered on Pakistan
const initialView = {
    latitude: 30.3753,
    longitude: 69.3451,
    zoom: 5,
};

export default function HeroMap() {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [provinceIndex, setProvinceIndex] = useState(0);
    const [isFlyingToProvince, setIsFlyingToProvince] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Load CSV Data
        fetch('/projects.csv')
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setProjects(results.data);
                    },
                });
            })
            .catch((error) => console.error('Error loading CSV:', error));

        // Smooth FlyTo Transitions
        const interval = setInterval(() => {
            if (mapRef.current) {
                const nextProvince = provinces[provinceIndex];
                setIsFlyingToProvince(true);

                // Fly to the next province
                mapRef.current.flyTo({
                    center: [nextProvince.lon, nextProvince.lat],
                    zoom: nextProvince.zoom,
                    speed: 0.3, // Slower for smoother transition
                    curve: 1.8, // Adjust curvature of the flight path
                    easing: (t) => t,
                    essential: true,
                });

                // After flying to the province, set a timeout to fly back to Pakistan
                setTimeout(() => {
                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: [initialView.longitude, initialView.latitude],
                            zoom: initialView.zoom,
                            speed: 0.3,
                            curve: 1.8,
                            easing: (t) => t,
                            essential: true,
                        });
                    }
                    setIsFlyingToProvince(false);
                    setProvinceIndex((prevIndex) => (prevIndex + 1) % provinces.length);
                }, 3000); // Stay on the province for 10 seconds
            }
        }, 2000); // Total interval of 20 seconds (10s on province + 10s on Pakistan)

        return () => clearInterval(interval); // Cleanup on unmount
    }, [provinceIndex]);

    // Function to add province borders
    const addProvinceBorders = () => {
        if (mapRef.current) {
            // Add Mapbox Boundaries source for admin-1 level (provinces/states)
            mapRef.current.addSource('admin-1-boundaries', {
                type: 'vector',
                url: 'mapbox://mapbox.boundaries-adm1-v4',
                promoteId: 'mapbox_id',
            });

            // Add a layer to style the province borders
            mapRef.current.addLayer({
                id: 'province-borders',
                type: 'line',
                source: 'admin-1-boundaries',
                'source-layer': 'boundaries_admin_1',
                filter: ['==', 'iso_3166_1', 'PK'], // Filter for Pakistan
                layout: {},
                paint: {
                    'line-color': '#FFD700', // Gold color for province borders
                    'line-width': 2,
                },
            });
        }
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '450px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
            }}
        >
            <Map
                initialViewState={initialView}
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxAccessToken={MAPBOX_TOKEN}
                onLoad={(e) => {
                    mapRef.current = e.target;
                    addProvinceBorders(); // Add province borders on map load
                }}
            >
                {/* Project Markers with Category Colors */}
                {projects.map((project, index) => {
                    const category = project.cat.toLowerCase();
                    const color = categoryColors[category] || '#FFFFFF';

                    return (
                        <Marker key={index} longitude={parseFloat(project.lon)} latitude={parseFloat(project.lat)}>
                            <Box
                                sx={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: color,
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        </Marker>
                    );
                })}
            </Map>

            {/* Sidebar to Show Current Location */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '10px',
                    zIndex: 1000,
                }}
            >
                <Typography variant="h6">Now Viewing:</Typography>
                <Typography variant="h5" fontWeight="bold">
                    {isFlyingToProvince ? provinces[provinceIndex].name : 'Pakistan Overview'}
                </Typography>
            </Box>

            {/* Legend */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    zIndex: 1000,
                }}
            >
                <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 1 }}>
                    Legend
                </Typography>
                {Object.entries(categoryColors).map(([category, color]) => (
                    <Box key={category} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Box
                            sx={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: color,
                                borderRadius: '50%',
                                marginRight: '8px',
                            }}
                        />
                        <Typography variant="body2">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
