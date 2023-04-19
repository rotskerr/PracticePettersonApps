import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nav from "../Nav/Nav";
import team from "./team.jpg";
import "./style.css";

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="#B8B7B7" align="center">
        {"Copyright © "}
        <Link color="inherit" target="_blank" href="https://pettersonapps.com/">
          PettersonApps
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
              
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          <Container  sx={{ py: 10 }} maxWidth="md">
            {/* End hero unit */}
            <Typography variant="h5" align="center" color="#B8B7B7" paragraph>
              This software product was developed during the production and
              technological practice at PettersonApps by two students of the
              KN-43 group Vladyslav Voychyshyn and Maksym Honak
            </Typography>
          </Container>
          <img className="Team"  src={team} alt="team" />

        </main>
        {/* Footer */}
        <Box
          sx={{ bgcolor: "#3f3e3e", p: 6, color: "#B8B7B7" }}
          component="footer"
        >
          
          <Typography
            variant="subtitle1"
            align="center"
            color="#B8B7B7"
            component="p"
          >
            This software product was developed during the production and technological practice 
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}
