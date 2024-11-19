import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  href: string;
  [key: string]: any;
}

const CustomButton = ({ children, href, ...props }: CustomButtonProps) => (
  <Button
    variant="outlined"
    href={href}
    sx={{
      color: "#fff", // Button text color
      textTransform: "none",
      margin: "0 0.5rem",
      borderColor: "#fffe", // Set the border color to white
      borderRadius: "50px",
      padding: "0.5rem 1rem", // Consistent padding
      height: "2.5rem", // Ensure consistent height
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "#fff", // Maintain white border on hover
      },
      "&.MuiButton-outlined": {
        borderColor: "#fff", // Set the outline color explicitly
      },
    }}
    {...props}
  >
    {children}
  </Button>
);
export default function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        direction: "col",
        height: "4em",
        position: "static",
        bgcolor: "#2e3f42",
      }}
    >
      <Box
        sx={{
          width: "20%",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            borderRadius: "60%",
            border: "2px solid white",
            maxWidth: "25%", // Ensure the logo fits within the box
            maxHeight: "50%", // Maintain proportions
            objectFit: "cover", // Scale the logo correctly
          }}
        />
        <Typography
          variant="h6"
          sx={{
            ml: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Foundly
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: { xs: "center", md: "flex" },
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <ButtonGroup
            sx={{
              gap: "2rem", // spacing between buttons
            }}
          >
            <CustomButton href="/found">Lost </CustomButton>
            <CustomButton href="/dashboard">and</CustomButton>
            <CustomButton href="/found">Found</CustomButton>
          </ButtonGroup>
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <CustomButton href="/auth/signin">Login</CustomButton>
        <CustomButton href="/auth/signup">Signup</CustomButton>
      </Box>
    </Box>
  );
}
