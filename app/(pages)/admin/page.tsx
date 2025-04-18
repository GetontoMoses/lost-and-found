"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  dateLost?: string;
  claimed?: boolean;
}

const AdminPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [claimedItems, setClaimedItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    location: "",
    imageUrl: "",
    dateLost: dayjs().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items/fetch");
      const data = await response.json();
      setItems(data.items);
      setClaimedItems(data.items.filter((item: Item) => item.claimed));
    };

    fetchItems();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Convert image to base64
  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewItem({ ...newItem, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    const response = await fetch("/api/items/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const addedItem = await response.json();
      setItems((prev) => [...prev, addedItem]);
      alert("Item added successfully!");
      setNewItem({
        name: "",
        description: "",
        location: "",
        imageUrl: "",
        dateLost: dayjs().format("YYYY-MM-DD"),
      });
    } else {
      alert("Failed to add item.");
    }
  };

  const handleMarkAsClaimed = async (id: string) => {
    const response = await fetch(`/api/items/${id}/claim`, { method: "PUT" });

    if (response.ok) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, claimed: true } : item))
      );
      const claimedItem = items.find((item) => item.id === id);
      if (claimedItem) {
        setClaimedItems((prev) => [...prev, { ...claimedItem, claimed: true }]);
      }
      alert("Item marked as claimed.");
    } else {
      alert("Failed to mark item as claimed.");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const response = await fetch(`/api/items/${id}/delete`, {
      method: "DELETE",
    });

    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setClaimedItems((prev) => prev.filter((item) => item.id !== id));
      alert("Item deleted successfully.");
    } else {
      alert("Failed to delete item.");
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Add New Item */}
      <Box
        sx={{
          bgcolor: "#E6F7F5",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add a New Lost Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={newItem.location}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImagePick}
              />
            </Button>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          sx={{ marginTop: "20px" }}
        >
          Add Item
        </Button>
      </Box>

      {/* Items List */}
      <Typography variant="h5" gutterBottom>
        All Items
      </Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ bgcolor: "#E6F7F5", borderRadius: "8px" }}>
              <CardContent>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="caption">
                  Location: {item.location}
                </Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleMarkAsClaimed(item.id)}
                  >
                    Mark as Claimed
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteItem(item.id)}
                    sx={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminPage;
