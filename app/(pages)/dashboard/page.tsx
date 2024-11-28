import { Box, Button, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

export default async function Dashboard() {
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
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: { xs: "none", md: "flex" },
            fontWeight: 100,
            textDecoration: "none",
          }}
        >
          The place where found happens. A seamless platform to reclaim what is
          yours
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: "1.5em",
            display: { xs: "none", md: "flex" },
            fontWeight: 100,
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Welcome to our Lost and Found platform, designed to help you easily
          report, track, and claim lost items. Whether you’ve misplaced
          something or found an item, our app makes it simple to connect with
          others and get your belongings back where they belong.
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
