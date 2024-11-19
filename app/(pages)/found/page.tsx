"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Found() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true after component has mounted
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/items/search?search=${searchQuery}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.items) {
        window.location.href = `/search?items=${JSON.stringify(data.items)}`;
      } else {
        console.log("No items found");
      }
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };
  if (!isMounted) {
    return null;
  }
  return (
    <Box
      sx={{
        width: "100%",
        minheight: "100vh", // Ensure the parent box spans the full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Horizontally center the child
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "20%",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search lost items"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ bgcolor: "white", width: "60%", marginRight: "1rem" }}
        />
        {/* Search Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ backgroundColor: "#2e3f42" }}
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexdirection: "column",
          height: "80%",
          width: "80%",
        }}
      >
        <Box sx={{ bgcolor: "red", width: "80%", textAlign: "center" }}>
          3rd
        </Box>
        <Box sx={{ bgcolor: "pink", width: "20%", textAlign: "center" }}>
          4th
        </Box>
      </Box>
    </Box>
  );
}
