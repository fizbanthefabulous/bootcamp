import React, {Component} from 'react';
import TimeForm from '../TimeForm/TimeForm';
import ProjectCard from '../ProjectCard/ProjectCard';
import convertMinsToHHSS from '../../utility/FormatFuncs';
import './LoggerApp.css';

class LoggerApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            personalTimeTotal: 0,
            workTimeTotal: 0,
            
            personalTaskList: [],
            workTaskList: [],
        }
    }


    //Adds a task to the appropriate list
    addTask = (props) => {
        console.log(props);
        var tempTask = {desc: '', time: 0, displayTime: ''};
        
        //Populate temptask attributes
        tempTask.time = props.minutes;
        tempTask.desc = props.description;
        tempTask.displayTime = convertMinsToHHSS(props.minutes);

        //Sum time and add task to appropriate state attributes
        if(props.project === 'personal') {
            console.log("personal");
            let personalTimeTotal = this.state.personalTimeTotal + props.minutes;

            console.log(tempTask);
            this.setState({
                personalTaskList: [...this.state.personalTaskList, tempTask],
                personalTimeTotal,
            })
        }
        else {
            console.log('work');
            let workTimeTotal = this.state.workTimeTotal + props.minutes;

            console.log(tempTask);
            this.setState({
                workTaskList: [...this.state.workTaskList, tempTask],
                workTimeTotal,
            })
        }
    }
  
    render() {
        console.log(this.state);

        return (
        <div className="loggerApp">
            <h1>Work Logger</h1>
            <TimeForm addTask={this.addTask}/>
            <hr />
            <ProjectCard title="Personal" totalTime={convertMinsToHHSS(this.state.personalTimeTotal)} taskList={this.state.personalTaskList}/>
            <ProjectCard title="Work" totalTime={convertMinsToHHSS(this.state.workTimeTotal)} taskList={this.state.workTaskList}/>
        </div>
        );
    }
}

export default LoggerApp;