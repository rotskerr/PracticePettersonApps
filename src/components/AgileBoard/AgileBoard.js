import React from "react";
import Nav from "../Nav/Nav";
import TaskList from "./TaskList";
import { TASKS } from "./json";
import NewTask from "../NewTask/NewTask";
import NewProject from "../NewProject/NewProject";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import './styles.css'


const AgileBoard = () => {
  return (
    <div>
      <Nav />
      <div className="ControlPanel">
        <ProjectSelect />
        <NewProject />
        <NewTask />
      </div>
      <TaskList tasks={TASKS} />
    </div>
  );
};

export default AgileBoard;
