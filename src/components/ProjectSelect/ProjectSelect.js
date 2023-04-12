import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function ProjectSelect(props) {
  const [selectedProject, setSelectedProject] = useState("");

  

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
        {props.projectList.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProjectSelect;
