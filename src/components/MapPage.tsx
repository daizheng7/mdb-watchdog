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
      setCurrentYear((prevYear) => {
        if (prevYear >= 2024) {
          clearInterval(interval); // Stop at 2024
          return prevYear;
        }
        return prevYear + 1;
      });
    }, 2000); // Increase year every 2 seconds
  
    return () => clearInterval(interval);
  }, []);

  // **Update Visible Projects Based on Filters**
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
    <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
      {/* Left Section (Map and Filter) */}
      <Box sx={{ flexGrow: 4, position: "relative", borderRadius: "12px", overflow: "hidden" }}>
        {/* Full-Screen Map */}
        <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />

        {/* Filter Overlay */}
        <Paper
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            maxHeight: "120px",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: 3,
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary.main" sx={{ mb: 2, textAlign: "center" }}>
            Filter Projects
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={filters.category}
                  onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Energy">Energy</MenuItem>
                  <MenuItem value="Water">Water</MenuItem>
                  <MenuItem value="Agriculture">Agriculture</MenuItem>
                </Select>
              </FormControl>
            </Grid>

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

            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight="bold">
                Year: {currentYear}
              </Typography>
              <Slider value={[2010, currentYear]} min={2010} max={2024} valueLabelDisplay="auto" />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Right Section (Project List) */}
      <Paper
        sx={{
          flexGrow: 1,
          backgroundColor: "#ffffff",
          boxShadow: 3,
          borderRadius: "12px",
          padding: "20px",
          marginLeft: "20px",
          overflowY: "auto",
          maxHeight: "85vh",
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
