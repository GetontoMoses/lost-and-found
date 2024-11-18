import Box from "@mui/material/Box";

export default function Found() {
  return (
    <Box
      sx={{
        bgcolor: "yellow",
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
          bgcolor: "blue",
          height: "20%",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        1st
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
