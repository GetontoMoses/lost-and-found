import Box from "@mui/material/Box";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Box>
          <Navbar />
        </Box>

        <Box
          sx={{
            flex: 1, // Fills available space
            display: "flex",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
        <Box>
          <Footer />
        </Box>
      </body>
    </html>
  );
}
