import React from 'react';
import AddTask from './AddTask.js';
import TaskList from  './TaskList.js';
import TaskFilters from './TaskFilters.js';
import update from 'immutability-helper';
import './TaskApp.css';


class TaskApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskList: [{text: 'Finish Task App', status: 'active'},{text: 'Feed cat', status: 'completed'}],
            tasksActive: 1,
            selectedFilter: 'active'
        }
    }

    //Add a task to the list
    addTask = (props) => {

        //Check that Enter key has been pressed and value isn't just whitespace 
        if(props.key === "Enter" && props.target.value.trim() !== '')
        {
            let tempTask = props.target.value;
            console.log(tempTask);

            //Add the new task
            this.setState({
                taskList: [...this.state.taskList, {text: tempTask, status: 'active'}],
                tasksActive: this.state.tasksActive + 1
            })

            //Clear input
            props.target.value = '';
        }
       
    }

    //Update the current filter
    updateFilter = (props) => {
        this.setState({
            selectedFilter: props.target.id
        })
    }

    //Update status on clicked task
    changeStatus = (props) => {

        //Copy clicked task and number of active tasks
        let tempTask = Object.assign({}, this.state.taskList[props.target.id]);
        let tempTasksActive = this.state.tasksActive;

        console.log(tempTask);
        
        //Flip status and increment or decrement active tasks as needed
        if(tempTask.status === 'active') {
            tempTask.status = 'completed';
            tempTasksActive -= 1;
        } 
        else {
            tempTask.status = 'active';
            tempTasksActive += 1;
        }
        
        //Setup for ES6 computed property name
        let idx = props.target.id;
        
        //Update state
        this.setState({
            //This uses the immutability-helper library: https://github.com/kolodny/immutability-helper
            taskList: update(this.state.taskList, {[idx]: {$set: tempTask}}),
            tasksActive: tempTasksActive
        })
    }


    render() {
        return (
            <div id="taskApp">
                <h1>Tasks</h1>
                <AddTask addTask={this.addTask}/>
                <TaskList 
                    taskList={this.state.taskList} 
                    selectedFilter={this.state.selectedFilter}
                    changeStatus={this.changeStatus}
                />
                <TaskFilters 
                    selectedFilter={this.state.selectedFilter} 
                    tasksActive={this.state.tasksActive} 
                    updateFilter={this.updateFilter}
                />
            </div>
        )
    }
}

export default TaskApp;