import React from "react";
import Nav from "../Nav/Nav";
import TaskList from "./TaskList";
import { TASKS } from "./json";
import NewTask from "../NewTask/NewTask";
import NewProject from "../NewProject/NewProject";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

const AgileBoard = () => {
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
        <ProjectSelect projectList={projects} />
        <NewProject
          onCreate={(project) => {
            setProjects((prev) => {
              return [...prev, project];
            });
          }}
        />
        <NewTask />
      </div>
      <TaskList tasks={TASKS} />
    </div>
  );
};

export default AgileBoard;
