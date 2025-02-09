"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation"; // Highlight active page

export default function Navbar() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // Get current page for active styling

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation Links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Energy", href: "/energy" },
    { label: "Water", href: "/water" },
    { label: "Agriculture", href: "/agriculture" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.primary.main,
          boxShadow: 3,
          padding: "10px 0",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Logo / Title */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                letterSpacing: "1px",
                flexShrink: 0,
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.secondary.main,
                  transition: "0.3s ease",
                },
              }}
              component={Link}
              href="/"
            >
              MDB Watchdog
            </Typography>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "20px" }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    padding: "12px 18px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    color: pathname === link.href ? theme.palette.secondary.main : theme.palette.text.secondary,
                    backgroundColor: pathname === link.href ? "rgba(0, 0, 0, 0.1)" : "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      color: "#FFFFFF",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton sx={{ display: { xs: "flex", md: "none" } }} onClick={handleDrawerToggle} color="inherit">
              <MenuIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer (Collapsible Menu) */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 260, backgroundColor: theme.palette.background.default, height: "100vh" }}>
          <Typography
            variant="h6"
            sx={{
              padding: "20px",
              fontWeight: "bold",
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            MDB Watchdog
          </Typography>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={handleDrawerToggle}
                  sx={{
                    padding: "14px 20px",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    backgroundColor: pathname === link.href ? "rgba(0, 0, 0, 0.1)" : "transparent",
                    color: pathname === link.href ? theme.palette.secondary.main : theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      color: "#FFFFFF",
                    },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
