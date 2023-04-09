import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function ProjectSelect(props) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

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

  const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel sx={{ color: "#b8b7b7" }}>Projects</InputLabel>
      <Select
        sx={{ color: "#b8b7b7", borderColor: "#b8b7b7" }}
        value={selectedProject}
        onChange={handleSelectChange}
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProjectSelect;
