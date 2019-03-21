import React from 'react';
import Task from '../Task/Task'
import './ProjectCard.css';


const ProjectCard = (props) => {
  //Sort by time descending
  let taskList = props.taskList.sort(((a,b) => {return (b.time - a.time)}));
  let Tasks = taskList.map((task, idx) => <Task key={idx} time={task.displayTime} desc={task.desc}/>);
  

  return (
    <div className="project">
      <h3 className="projectTitle">{props.title}</h3>
      <span className="totalTime">{props.totalTime}</span>
      <ul>
        {Tasks}
      </ul>
    </div>
  );
}

export default ProjectCard;