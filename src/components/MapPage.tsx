"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel, TextField, Slider, Paper } from "@mui/material";

// **Mapbox Token**
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// **Dummy Project Data**
const projects = [
    { id: 1, title: "Water Project 1", category: "Water", year: 2012, latitude: 24.802, longitude: 67.488 },
    { id: 2, title: "Agriculture Project 2", category: "Agriculture", year: 2017, latitude: 31.921, longitude: 74.336 },
    { id: 3, title: "Water Project 3", category: "Water", year: 2023, latitude: 24.891, longitude: 66.552 },
    { id: 4, title: "Energy Project 4", category: "Energy", year: 2023, latitude: 30.264, longitude: 72.499 },
    { id: 5, title: "Energy Project 5", category: "Energy", year: 2009, latitude: 33.575, longitude: 73.191 },
    { id: 6, title: "Agriculture Project 6", category: "Agriculture", year: 2022, latitude: 28.844, longitude: 69.226 },
    { id: 7, title: "Energy Project 7", category: "Energy", year: 2004, latitude: 28.267, longitude: 66.709 },
    { id: 8, title: "Energy Project 8", category: "Energy", year: 2009, latitude: 27.711, longitude: 67.586 },
    { id: 9, title: "Energy Project 9", category: "Energy", year: 2015, latitude: 30.090, longitude: 71.940 },
    { id: 10, title: "Water Project 10", category: "Water", year: 2019, latitude: 25.405, longitude: 68.758 },
    { id: 11, title: "Agriculture Project 11", category: "Agriculture", year: 2021, latitude: 26.893, longitude: 69.056 },
    { id: 12, title: "Energy Project 12", category: "Energy", year: 2001, latitude: 30.785, longitude: 71.435 },
    { id: 13, title: "Water Project 13", category: "Water", year: 2014, latitude: 24.873, longitude: 67.033 },
    { id: 14, title: "Agriculture Project 14", category: "Agriculture", year: 2010, latitude: 29.121, longitude: 70.843 },
    { id: 15, title: "Energy Project 15", category: "Energy", year: 2023, latitude: 31.573, longitude: 74.311 },
    { id: 16, title: "Water Project 16", category: "Water", year: 2008, latitude: 28.507, longitude: 69.025 },
    { id: 17, title: "Energy Project 17", category: "Energy", year: 2019, latitude: 33.527, longitude: 73.075 },
    { id: 18, title: "Agriculture Project 18", category: "Agriculture", year: 2020, latitude: 26.719, longitude: 68.921 },
    { id: 19, title: "Water Project 19", category: "Water", year: 2016, latitude: 32.134, longitude: 71.581 },
    { id: 20, title: "Agriculture Project 20", category: "Agriculture", year: 2005, latitude: 30.019, longitude: 72.516 },
  ];

// **Category Colors**
const categoryColors = {
  Energy: "#FF5733",
  Water: "#37879A",
  Agriculture: "#8FBC8F",
};

export default function MapPage() {
  const mapRef = useRef(null);
  const [filters, setFilters] = useState({ category: "", searchQuery: "" });
  const [currentYear, setCurrentYear] = useState(2010);
  const [visibleProjects, setVisibleProjects] = useState([]);

  // **Initialize Map on First Load**
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [69.3451, 30.3753],
      zoom: 5,
      accessToken: MAPBOX_TOKEN,
    });

    map.on("load", () => {
      map.addSource("projects", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer({
        id: "project-markers",
        type: "circle",
        source: "projects",
        paint: {
          "circle-radius": 6,
          "circle-color": ["get", "color"],
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  // **Automatically Progress Year**
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prevYear) => (prevYear >= 2024 ? 2010 : prevYear + 1));
    }, 2000); // Increase year every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // **Update Visible Projects Based on Year Progression**
  useEffect(() => {
    const filteredProjects = projects.filter(
      (project) =>
        (filters.category === "" || project.category === filters.category) &&
        project.year <= currentYear &&
        project.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );

    setVisibleProjects(filteredProjects);

    if (mapRef.current?.getSource("projects")) {
      mapRef.current.getSource("projects").setData({
        type: "FeatureCollection",
        features: filteredProjects.map((project) => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [project.longitude, project.latitude] },
          properties: {
            title: project.title,
            color: categoryColors[project.category] || "#FFFFFF",
          },
        })),
      });
    }
  }, [currentYear, filters]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Full-Screen Map */}
      <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />

      {/* Transparent Filter Overlay */}
      <Paper
        sx={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          padding: "15px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent overlay
          boxShadow: 3,
          minWidth: "80%",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ mb: 2 }}>
          Filter Projects
        </Typography>

        <Grid container spacing={2} alignItems="center">
          {/* Category Filter */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select name="category" value={filters.category} onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Energy">Energy</MenuItem>
                <MenuItem value="Water">Water</MenuItem>
                <MenuItem value="Agriculture">Agriculture</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Search Filter */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Projects"
              variant="outlined"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            />
          </Grid>

          {/* Year Progression Display */}
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold">
              Year: {currentYear}
            </Typography>
            <Slider value={[2010, currentYear]} min={2010} max={2024} valueLabelDisplay="auto" />
          </Grid>
        </Grid>
      </Paper>

      {/* Transparent Project List */}
      <Paper
        sx={{
          position: "absolute",
          top: "20%",
          right: "20px",
          zIndex: 1,
          padding: "15px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent effect
          boxShadow: 3,
          maxHeight: "60vh",
          overflowY: "auto",
          minWidth: "300px",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ mb: 2 }}>
          Project List
        </Typography>
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => (
            <Paper key={project.id} sx={{ padding: "10px", marginBottom: "10px", boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold">{project.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {project.category} | Year: {project.year}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No projects match the filters.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
