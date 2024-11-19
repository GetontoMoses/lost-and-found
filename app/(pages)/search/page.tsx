"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

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
  const itemsPerPage = 6;

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

  return (
    <Box>
      {items.length === 0 ? (
        <Typography variant="h6" align="center">
          No items found.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {paginatedItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    <Typography variant="caption">{item.location}</Typography>
                    {item.dateLost && (
                      <Typography variant="caption" display="block">
                        Lost on: {new Date(item.dateLost).toLocaleDateString()}
                      </Typography>
                    )}
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
        </>
      )}
    </Box>
  );
};

export default SearchResults;
