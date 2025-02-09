"use client";

import { Box, Typography, Button } from "@mui/material";
import Navbar from "@/components/Navbar";
import MapPage from "@/components/MapPage";
import { motion } from "framer-motion";
import PolicyEnergy from "@/components/PolicyEnergy";

export default function EnergyPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content: Full-Height Map Section */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flexGrow: 1, display: "flex" }}
        >
          <Box
            sx={{
              flexGrow: 1,
              height: "100%",
              borderRadius: "12px",
              boxShadow: 3,
              overflow: "hidden",
              backgroundColor: "#F8F9FA",
              display: "flex",
            }}
          >
            {/* Pass category="Energy" to filter only Energy projects */}
            <MapPage category="Energy" />
          </Box>
        </motion.div>
      </Box>

      {/* Energy Policy Timeline Section Below */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Box
          sx={{
            padding: "60px 20px",
            backgroundColor: "#E6EBD8",
            borderRadius: "12px",
            boxShadow: 3,
            width: "100%",
          }}
        >
          <PolicyEnergy />
        </Box>
      </motion.div>
    </Box>
  );
}
