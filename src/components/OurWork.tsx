"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import EnergyIcon from "@mui/icons-material/ElectricBolt";
import WaterIcon from "@mui/icons-material/WaterDrop";
import AgricultureIcon from "@mui/icons-material/Grass";
import ClimateIcon from "@mui/icons-material/Public"; // New Climate Icon

// Animations
const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        backgroundColor: theme.palette.background.default,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        color="primary"
        fontWeight="bold"
        sx={{ marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}
      >
        Our Work
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          width: "100%",
          overflowX: "auto", // Enables scrolling on smaller screens
          flexWrap: "nowrap", // Ensures items stay on one line
          paddingBottom: "10px",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for a clean look
        }}
      >
        {/* Energy Box */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
          <Link href="/energy" passHref>
            <Box
              sx={{
                width: 300,
                height: 360,
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                boxShadow: 5,
                cursor: "pointer",
                textAlign: "center",
                padding: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: 10 },
              }}
            >
              <motion.div variants={iconVariants} initial="initial" animate="animate">
                <EnergyIcon sx={{ fontSize: 90, color: theme.palette.text.secondary }} />
              </motion.div>
              <Typography variant="h5" color="white" sx={{ marginTop: 2, fontWeight: "bold" }}>
                Energy
              </Typography>
              <Typography variant="body2" color="white" sx={{ marginTop: 1, opacity: 0.8 }}>
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
                width: 300,
                height: 360,
                backgroundColor: theme.palette.info.main,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                boxShadow: 5,
                cursor: "pointer",
                textAlign: "center",
                padding: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: 10 },
              }}
            >
              <motion.div variants={iconVariants} initial="initial" animate="animate">
                <WaterIcon sx={{ fontSize: 90, color: theme.palette.text.secondary }} />
              </motion.div>
              <Typography variant="h5" color="white" sx={{ marginTop: 2, fontWeight: "bold" }}>
                Water
              </Typography>
              <Typography variant="body2" color="white" sx={{ marginTop: 1, opacity: 0.8 }}>
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
                width: 300,
                height: 360,
                backgroundColor: theme.palette.secondary.main,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                boxShadow: 5,
                cursor: "pointer",
                textAlign: "center",
                padding: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: 10 },
              }}
            >
              <motion.div variants={iconVariants} initial="initial" animate="animate">
                <AgricultureIcon sx={{ fontSize: 90, color: theme.palette.text.secondary }} />
              </motion.div>
              <Typography variant="h5" color="white" sx={{ marginTop: 2, fontWeight: "bold" }}>
                Agriculture
              </Typography>
              <Typography variant="body2" color="white" sx={{ marginTop: 1, opacity: 0.8 }}>
                Sustainable farming practices for the future.
              </Typography>
            </Box>
          </Link>
        </motion.div>

        {/* Climate Box */}
        <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
          <Link href="/climate" passHref>
            <Box
              sx={{
                width: 300,
                height: 360,
                backgroundColor: theme.palette.error.main,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                boxShadow: 5,
                cursor: "pointer",
                textAlign: "center",
                padding: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: 10 },
              }}
            >
              <motion.div variants={iconVariants} initial="initial" animate="animate">
                <ClimateIcon sx={{ fontSize: 90, color: theme.palette.text.secondary }} />
              </motion.div>
              <Typography variant="h5" color="white" sx={{ marginTop: 2, fontWeight: "bold" }}>
                Climate
              </Typography>
              <Typography variant="body2" color="white" sx={{ marginTop: 1, opacity: 0.8 }}>
                Climate resilience and mitigation for a sustainable future.
              </Typography>
            </Box>
          </Link>
        </motion.div>
      </Box>
    </Box>
  );
}
