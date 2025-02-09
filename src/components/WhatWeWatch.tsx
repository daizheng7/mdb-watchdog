"use client";

import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { FaHandshake } from "react-icons/fa";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // MDBs Icon
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Funding Icon
import BusinessIcon from "@mui/icons-material/Business"; // CPEC Icon

// Animation Variants
const cardVariants = {
  initial: { scale: 1, opacity: 0.9 },
  hover: { scale: 1.08, opacity: 1, transition: { duration: 0.3 } },
};

// Organizations Being Monitored
const watchList = [
  {
    id: 1,
    name: "World Bank",
    icon: <AccountBalanceIcon sx={{ fontSize: 70, color: "#8FBC8F" }} />, // Green
  },
  {
    id: 2,
    name: "Asian Development Bank",
    icon: <AttachMoneyIcon sx={{ fontSize: 70, color: "#FCE883" }} />, // Yellow
  },
  {
    id: 3,
    name: "China-Pakistan Economic Corridor",
    icon: <BusinessIcon sx={{ fontSize: 70, color: "#564F7D" }} />, // Purple
  },
  {
    id: 4,
    name: "Other Development Banks",
    icon: <FaHandshake size={70} color="#8B0000" />, // Dark Red
  },
];

export default function WhatWeWatch() {
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "background.default",
        padding: { xs: "60px 20px", md: "100px 80px" },
      }}
    >
      {/* Title Section */}
      <Typography
        variant="h2"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          marginBottom: 6,
          maxWidth: "1000px",
          marginX: "auto",
          lineHeight: 1.3,
          fontSize: { xs: "2.5rem", md: "3.5rem" }, // Ensuring it remains large
          letterSpacing: "0.5px",
        }}
      >
        MDB Watchdog monitors{" "}
        <Box component="span" sx={{ fontWeight: "bold", color: "black" }}>
          major international funding and infrastructure projects
        </Box>{" "}
        to ensure{" "}
        <Box component="span" sx={{ fontWeight: "bold", color: "black" }}>
          transparency, accountability, and real impact.
        </Box>
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        {watchList.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <motion.div variants={cardVariants} initial="initial" whileHover="hover">
              <Card
                sx={{
                  height: 240,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  boxShadow: 6,
                  borderRadius: "18px",
                  backgroundColor: "background.paper",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 12,
                    transform: "translateY(-5px)", // Subtle lift effect
                  },
                }}
              >
                {item.icon}
                <CardContent sx={{ paddingBottom: "0 !important" }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "text.primary",
                      fontSize: "1.2rem",
                      textTransform: "uppercase",
                      marginTop: 2,
                      letterSpacing: "0.8px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
