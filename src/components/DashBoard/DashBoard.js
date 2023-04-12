import * as React from "react";
import Nav from "../Nav/Nav";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./style.css";
import NewTask from "../NewTask/NewTask";
import NewProject from "../NewProject/NewProject";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import { useState, useEffect } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#333232",
  padding: theme.spacing(1),
  color: "#B8B7B7",
}));

export default function DashBoard() {
  const [project, setProject] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (selectedProjectId) {
      fetch(`https://practicepetersonapps.herokuapp.com/api/project/show/1`)
        .then((response) => response.json())
        .then((data) => setProject(data));
    }
  }, [selectedProjectId]);

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://practicepetersonapps.herokuapp.com/api/project/index")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="ControlPanel">
        <ProjectSelect projectList={projects} onSelect={handleProjectSelect} />
        <NewProject
          onCreate={(project) => {
            setProjects((prev) => {
              return [...prev, project];
            });
          }}
        />
        <NewTask />
      </div>

      <div>
        {project && (
          <>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </>
        )}
      </div>

      <Box className="taskContainer" sx={{ width: "90%" }}>
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
