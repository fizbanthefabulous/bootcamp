import React from 'react';
import './Task.css';

const Task = (props) => {
  return (
    <li><span className="time">{props.time}</span><span className="description">{props.desc}</span></li>
  );
}

export default Task;