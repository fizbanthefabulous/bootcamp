import React from 'react';
import './tasklist.css';


const TaskListItem = (props) => {
    return (
        <li id={props.id} status={props.status} onClick={(e) => props.changeStatus(e)}>{props.value}</li>
    )
}


const TaskList = (props) => {
    console.log(props.taskList);
    let taskList = [];

    console.log(props.selectedFilter);

    //Check selected filter and filter task list as appropriate
    if(props.selectedFilter === 'active'){
        taskList = props.taskList.filter(task => task.status === 'active');
    }
    else if(props.selectedFilter === 'completed') {
        taskList = props.taskList.filter(task => task.status === 'completed');
    }
    else {
        taskList = props.taskList;
    }
    
    taskList = taskList.map((listItem, idx) => <TaskListItem key={idx} id={idx} value={listItem.text} status={listItem.status} changeStatus={props.changeStatus}/>);

    return (
        <div id="TaskList">
            <ul>
                {taskList}
            </ul>
        </div>
    )
}


export default TaskList;