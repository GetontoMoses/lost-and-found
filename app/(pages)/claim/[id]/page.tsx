"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
} from "@mui/material";

interface Item {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  dateLost?: string;
  pickupLocation: string;
}

const ClaimItem: React.FC = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  // Fetch item details based on the item ID from the URL
  useEffect(() => {
    const itemId = window.location.pathname.split("/").pop(); // Get item ID from the URL
    if (itemId) {
      const fetchItemDetails = async () => {
        try {
          const response = await fetch(`/api/items/${itemId}`);
          const data = await response.json();
          if (data.item) {
            setItem(data.item);
          } else {
            console.error("Item not found");
          }
        } catch (error) {
          console.error("Error fetching item details:", error);
        }
      };
      fetchItemDetails();
    }
  }, []);

  const handleClaim = () => {
    if (name && contact) {
      setClaimStatus("Claiming...");
      setTimeout(() => {
        // Simulate successful claim submission
        setClaimStatus(
          "Claim successful! Please pick up your item from the Administator in Computer Lab 1."
        );
      }, 1500);
    } else {
      setClaimStatus("Please provide your name and contact details.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "20px",
      }}
    >
      {item ? (
        <Box
          sx={{
            bgcolor: "#EDEADE",
            display: "flex",
            flexDirection: "column",
            width: "80%",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                  <Typography variant="caption">
                    Location: {item.location}
                  </Typography>
                  {item.dateLost && (
                    <Typography variant="caption" display="block">
                      Lost on: {new Date(item.dateLost).toLocaleDateString()}
                    </Typography>
                  )}
                  <Typography variant="caption" display="block">
                    Pickup Location: {item.pickupLocation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Claim Form */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Claim Your Item
                </Typography>

                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Your Contact (Email/Phone)"
                  variant="outlined"
                  fullWidth
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClaim}
                  sx={{ backgroundColor: "#2e3f42", color: "#fff" }}
                >
                  Claim Item
                </Button>

                {claimStatus && (
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "20px",
                      color: claimStatus.includes("successful")
                        ? "green"
                        : "red",
                    }}
                  >
                    {claimStatus}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          Loading item details...
        </Typography>
      )}
    </Box>
  );
};

export default ClaimItem;
