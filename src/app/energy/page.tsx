"use client";

import { Box, Typography, Button } from "@mui/material";
import Navbar from "@/components/Navbar";
import MapPage from "@/components/MapPage";
import { motion } from "framer-motion";

export default function EnergyPage() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content: Full 4/5 Section with Map & Project List inside MapPage */}
      <Box sx={{ flexGrow: 1, display: "flex", minHeight: 0, padding: "20px" }}>
        {/* Animated Wrapper for MapPage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flexGrow: 1, minHeight: 0, display: "flex" }}
        >
          <Box
            sx={{
              flexGrow: 1,
              minHeight: "100%",
              borderRadius: "12px",
              boxShadow: 3,
              overflow: "hidden",
              padding: "10px",
              backgroundColor: "#F8F9FA",
              display: "flex",
            }}
          >
            {/* Pass category="Energy" to filter only Energy projects */}
            <MapPage category="Energy" />
          </Box>
        </motion.div>
      </Box>

      {/* Additional Element Below */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Box sx={{ padding: "20px", textAlign: "center", backgroundColor: "#E6EBD8", borderRadius: "12px", boxShadow: 3 }}>
          <Button variant="contained" color="primary">
            View More Projects
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
