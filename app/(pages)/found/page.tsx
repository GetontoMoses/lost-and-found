"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

interface Item {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  dateLost?: string;
}

const Found: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 20;

  // Fetch all items from the database on page load
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items/fetch", {
          method: "GET",
        });
        const data = await response.json();
        if (data.items) {
          setItems(data.items);
          setFilteredItems(data.items); // Initialize filtered items with all items
        } else {
          console.log("No items found");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
    setPage(0); // Reset pagination for the filtered results
  };

  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);

  const paginatedItems = filteredItems.slice(0, (page + 1) * itemsPerPage);

  const handleClaimItem = (itemId: string) => {
    // Redirect to a claim page with the item ID
    window.location.href = `/claim/${itemId}`;
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          bgcolor: "#EDEADE",
          height: "20%",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <TextField
          placeholder="Search lost items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ bgcolor: "white", width: "60%", marginRight: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ backgroundColor: "#2e3f42" }}
        >
          Search
        </Button>
      </Box>

      {/* Items Display */}
      {filteredItems.length === 0 ? (
        <Typography variant="h6" align="center">
          No items found.
        </Typography>
      ) : (
        <Box
          sx={{
            bgcolor: "#EDEADE",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "80%",
            padding: "20px",
          }}
        >
          <Grid container spacing={2}>
            {paginatedItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    <Typography variant="caption">
                      Area found: {item.location}
                    </Typography>
                    {item.dateLost && (
                      <Typography variant="caption" display="block">
                        Lost on: {new Date(item.dateLost).toLocaleDateString()}
                      </Typography>
                    )}
                    <Box textAlign="center" marginTop={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClaimItem(item._id)}
                      >
                        Claim
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {paginatedItems.length < filteredItems.length && (
            <Box textAlign="center" marginTop={2}>
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Found;
