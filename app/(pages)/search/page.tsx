"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

interface Item {
  _id: string;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  dateLost?: string;
}

const SearchResults: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 20;

  // Parse items from the query string
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const itemsParam = query.get("items");

    if (itemsParam) {
      try {
        const parsedItems: Item[] = JSON.parse(decodeURIComponent(itemsParam));
        setItems(parsedItems);
      } catch (error) {
        console.error("Failed to parse items:", error);
      }
    }
  }, []);

  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);

  const paginatedItems = items.slice(0, (page + 1) * itemsPerPage);

  const handleClaimItem = (itemId: string) => {
    // Redirect to a claim page with the item ID
    window.location.href = `/claim-item/${itemId}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {items.length === 0 ? (
        <Typography variant="h6" align="center">
          No items found.
        </Typography>
      ) : (
        <Box
          sx={{
            bgcolor: "blue",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "80%",
            padding: "20px", // Add padding to the inside of the container
          }}
        >
          <Grid container spacing={2}>
            {paginatedItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3} // Ensures that there are 4 items per row on medium and larger screens
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
                    padding: "10px", // Add padding inside each card
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
          {paginatedItems.length < items.length && (
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

export default SearchResults;
