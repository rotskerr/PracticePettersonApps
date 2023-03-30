import * as React from "react";
import Nav from "../Nav/Nav";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./style.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#333232",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "#B8B7B7",
}));

export default function DashBoard() {
  return (
    <div>
      <Nav />
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>
            <ul className="item">
              <li>Task</li>
              <li>description</li>
              <li>status</li>
            </ul>
          </Item>
          <Item>
            <ul className="item">
              <li>Task</li>
              <li>description</li>
              <li>status</li>
            </ul>
          </Item>
          <Item>
            <ul className="item">
              <li>Task</li>
              <li>description</li>
              <li>status</li>
            </ul>
          </Item>
        </Stack>
      </Box>
    </div>
  );
}
