import { Box, Button, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

export default function Dashboard() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mt: "1em",
            display: { xs: "none", md: "flex" },
            fontWeight: 100,
            textDecoration: "none",
          }}
        >
          Welcome to Foundly
        </Typography>
      </Box>
      <Box
        sx={{
          height: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: "-3em",
            display: { xs: "none", md: "flex" },
            fontWeight: 100,
            textDecoration: "none",
          }}
        >
          The place where found happens. A seamless platform to reclaim what is
          yours
        </Typography>
      </Box>
      <Box
        sx={{
          height: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          endIcon={<EastIcon />}
          href="/found"
          sx={{
            bgcolor: "#fff",
            borderColor: "#2e3f42",
            borderRadius: "50px",
            color: "black",
          }}
        >
          Discover other found Items
        </Button>
      </Box>
    </Box>
  );
}
