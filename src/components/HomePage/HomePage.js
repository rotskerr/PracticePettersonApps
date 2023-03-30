import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nav from "../Nav/Nav";

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="#B8B7B7" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}



const theme = createTheme();

export default function HomePage() {
  return (
    <div>
      <Nav />
      <ThemeProvider theme={theme}>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "#3f3e3e",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="#B8B7B7"
                gutterBottom
              >
                Petterson Web Youtrack
              </Typography>
              <Typography variant="h5" align="center" color="#B8B7B7" paragraph>
                description of Petterson Web Youtrack
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" color="success">
                  Main call to action
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            iure, aperiam culpa officia temporibus mollitia eveniet quidem optio
            alias atque illum natus ad, sunt nisi eius dolore eligendi maiores
            minus.
          </Container>
        </main>
        {/* Footer */}
        <Box
          sx={{ bgcolor: "#3f3e3e", p: 6, color: "#B8B7B7" }}
          component="footer"
        >
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="#B8B7B7"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}
